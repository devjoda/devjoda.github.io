import StorageService from '../services/storage-service.js';

/**
 * @description router for switching between views
 * @export
 * @class Router
 */
export default class Router {
  constructor() {
    this.defaultPage = '#/login';
    this.basePath = location.pathname.replace('index.html', ''); // remove index.html from path
    this.pages = document.querySelectorAll('.page');
    this.navItems = document.body.querySelectorAll('.nav-link');
    this.routes = {
      '#/': 'home',
      '#/home': 'home',
      '#/notifications': 'notifications',
      '#/benefits': 'benefits',
      '#/tickets': 'tickets',
      '#/search': 'search',
      '#/create-profile': 'create-profile',
      '#/login': 'login',
      '#/movie-details': 'movie-details',
      '#/booking': 'booking',
    };
    this.init();
  }

  init() {
    this.attachNavLinkEvents();
    window.addEventListener('popstate', () => this.showPage(location.hash));

    if (this.routes[location.hash]) {
      this.defaultPage = location.hash;
    }
    this.navigateTo(this.defaultPage);
  }

  attachNavLinkEvents() {
    for (const link of this.navItems) {
      link.addEventListener('click', (event) => {
        const path = link.getAttribute('href');
        this.navigateTo(path);
        event.preventDefault();
      });
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(path) {
    window.history.pushState({}, path, this.basePath + path);
    this.showPage(path);
  }

  // handles page rendering
  async showPage(path) {
    this.showLoader();
    const routeValue = `${this.routes[path]}`;
    // handle special cases
    this.handleSpecialCaseNotLogin(routeValue);
    let result = await this.handleSpecialCaseMovieDetails(path);
    if (result === true) {
      return;
    }
    switch (routeValue) {
      case 'login':
        this.hideHeader();
        this.hideFooter();
      case 'home':
        // update header title
        StorageService.storage?.header?.updateTitle('Hjem');
        // wait for initialization of first five movies to populate popular movies slider
        await this.waitForCondition(StorageService.storage?.movies);
        // append movies and events to dom
        const pageHome = StorageService.storage.findPageWithConstructorName('PageHome');
        const movies = StorageService.storage.movies;
        const cinemaEvents = StorageService.storage.cinemaEvents;
        pageHome.appendHome(0, movies, cinemaEvents, StorageService.storage.currentUser);
        break;
      case 'notifications':
        // update header title
        StorageService.storage?.header?.updateTitle('Påmindelser');
        // wait for initialization of current users notifications
        await this.waitForCondition(StorageService.storage?.currentUser?.notifications);
        // append movie notifications to dom
        const PageNotifications = StorageService.storage.findPageWithConstructorName('PageNotifications');
        PageNotifications.appendNotifications(StorageService.storage.currentUser);
        break;
      case 'benefits':
        // update header title
        StorageService.storage?.header?.updateTitle('Fordele');
        await this.waitForCondition(StorageService.storage?.currentUser);
        // append user data to dom
        const pageBenefits = StorageService.storage.findPageWithConstructorName('PageBenefits');
        pageBenefits.appendBenefits(StorageService.storage.currentUser);
        break;
      case 'tickets':
        // update header title
        StorageService.storage?.header?.updateTitle('Billetter');
        // wait for initialization of pages
        await this.waitForCondition(StorageService?.storage?.pages);
        // wait for initialization of current user tickets
        await this.waitForCondition(StorageService?.storage?.currentUser?.tickets);
        // append tickets to dom
        const pageTickets = StorageService.storage.findPageWithConstructorName('PageTickets');
        pageTickets.appendTickets(StorageService.storage.currentUser);
        break;
    }
    try {
      this.hideLoader();
      document.querySelector(`#${routeValue}`).style.display = 'block'; // show page by given path
      if (routeValue.localeCompare('booking') === 0 || routeValue.localeCompare('search') === 0) {
        this.setActiveTab('#/home');
      } else {
        this.setActiveTab(path);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  // hide all pages
  hideAllPages() {
    for (let i = 1; i < this.pages.length; i++) {
      this.pages[i].style.display = 'none';
    }
  }

  // show loader
  showLoader() {
    this.hideAllPages();
    this.pages[0].style.display = 'block';
  }

  hideLoader() {
    this.pages[0].style.display = 'none';
  }

  // sets active tabbar/ menu item
  setActiveTab(pathname) {
    for (const link of this.navItems) {
      if (pathname === link.getAttribute('href')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }

  showHeader() {
    document.querySelector('.main-header').style.display = 'grid';
  }

  hideHeader() {
    document.querySelector('.main-header').style.display = 'none';
  }

  showFooter() {
    document.querySelector('.main-footer').style.display = 'block';
  }

  hideFooter() {
    document.querySelector('.main-footer').style.display = 'none';
  }

  handleSpecialCaseNotLogin(routeValue) {
    if (routeValue !== 'login') {
      this.showHeader();
      this.showFooter();
    }
  }

  async handleSpecialCaseMovieDetails(path) {
    const newPath = path.substring(0, 15);
    if (newPath.localeCompare('#/movie-details') === 0) {
      this.hideAllPages();
      const movieUid = path.substring(16, 25);
      // update header title
      await this.waitForCondition(StorageService?.storage?.movies);
      const targetMovie = StorageService.storage.findMovieWithUid(movieUid);
      StorageService.storage?.header?.updateTitle(`${targetMovie.title}`);
      // append movie to dom
      const pageMovieDetails = StorageService.storage.findPageWithConstructorName('PageMovieDetails');
      pageMovieDetails.appendMovieDetails(StorageService.storage.currentUser, targetMovie);
      this.hideLoader();
      document.querySelector('#movie-details').style.display = 'block';
      this.setActiveTab('#/home');
      return true;
    }
    return false;
  }

  // waits for condition to be met before resolving
  async waitForCondition(condition) {
    let startTime = new Date().getTime();
    while (true) {
      if (condition) {
        break;
      }
      if (new Date() > startTime + 50) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}
