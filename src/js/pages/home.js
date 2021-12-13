import MovieSlider from '../components/domElements/movieSlider.js';

/**
 * @description homepage
 * @export
 * @class PageHome
 */
export default class PageHome {
  constructor(domElement) {
    this._domElement = domElement;
    this._movieSlider;
    this._currentUser = null;
    this._upcomingMovies = null;
    this.init();
  }

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  // movieSlider
  get movieSlider() {
    return this._movieSlider;
  }

  set movieSlider(value) {
    this._movieSlider = value;
  }

  // currentUser
  get currentUser() {
    return this._currentUser;
  }

  set currentUser(value) {
    this._currentUser = value;
  }

  // upcomingMovies
  get upcomingMovies() {
    return this._upcomingMovies;
  }

  set upcomingMovies(value) {
    this._upcomingMovies = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
    <section id="home" class="page"><div class="hero"></div> <div class="movie-feed"></div></section>
    `;
    this._movieSlider = new MovieSlider(document.querySelector('#home .hero'));
  }

  appendHome(index, movies, cinemaEvents, currentUser) {
    this._currentUser = currentUser;
    this.appendMovieSlider(index, movies.slice(0, 5));
    this.appendMovieFeed(movies, cinemaEvents);
  }

  appendMovieSlider(index, movies) {
    this._movieSlider.movies = movies;
    this._movieSlider.append(index);
  }

  appendMovieFeed(movies, cinemaEvents) {
    document.querySelector('#home .movie-feed').innerHTML = /*html*/ `
      <section>
        <div>
          <h2>Aktuelle film</h2>
          <div class="horizontal-scrolling-wrapper current-movies">
          </div>
        </div>
        <div class="seperator"></div>
      </section>
      <section>
        <div>
          <h2>Aktuelle events</h2>
          <div class="horizontal-scrolling-wrapper current-cinema-events">
          </div>
        </div>
        <div class="seperator"></div>
      </section>
      <section>
        <div>
          <h2>Kommende film</h2>
          <div class="horizontal-scrolling-wrapper upcoming-movies">
          </div>
        </div>
      </section>
    `;
    this.appendCurrentMovies(movies);
    this.appendCurrentCinemaEvents(cinemaEvents);
    this.appendUpcomingMovies(movies);
  }

  appendCurrentMovies(movies) {
    const currentMovies = movies.filter((element) => element.isShowing === true);
    const domElement = document.querySelector('.horizontal-scrolling-wrapper.current-movies');
    domElement.innerHTML = '';
    for (const movie of currentMovies) {
      const movieContainer = document.createElement('div');
      movieContainer.style.backgroundImage = `url('${movie.posterImagePath}')`;
      movieContainer.classList.add('movie');
      domElement.appendChild(movieContainer);
    }
  }

  appendCurrentCinemaEvents(cinemaEvents) {
    const currentCinemaEvents = cinemaEvents.filter((element) => element.isShowing === true);
    const domElement = document.querySelector('.horizontal-scrolling-wrapper.current-cinema-events');
    domElement.innerHTML = '';
    for (const cinemaEvent of currentCinemaEvents) {
      const cinemaEventContainer = document.createElement('div');
      const span = document.createElement('span');
      span.innerText = cinemaEvent.title;
      cinemaEventContainer.appendChild(span);
      cinemaEventContainer.style.backgroundImage = `url('${cinemaEvent.posterImagePath}')`;
      cinemaEventContainer.classList.add('cinemaEvent');
      domElement.appendChild(cinemaEventContainer);
    }
  }

  appendUpcomingMovies(movies) {
    const upcomingMovies = movies.filter((element) => element.isShowing === false);
    this._upcomingMovies = upcomingMovies;
    const upcomingMoviesContainer = document.querySelector('.horizontal-scrolling-wrapper.upcoming-movies');
    upcomingMoviesContainer.innerHTML = '';
    for (let i = 0; i < upcomingMovies.length; i++) {
      upcomingMoviesContainer.innerHTML += `<div data-movie-uid="${upcomingMovies[i].uid}" class="movie"><div data-is-active="false" data-movie-index="${i}" class="notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg></div></div>`;
      // set notification posters
      let movie = document.querySelector(`#home [data-movie-uid="${upcomingMovies[i].uid}"]`);
      movie.style.backgroundImage = `url('${upcomingMovies[i].posterImagePath}')`;
      // init notification icons
      this.initNotificationIcons();
    }
    // bind eventlistener to notification icon
    const notificationIconContainers = document.querySelectorAll('#home .horizontal-scrolling-wrapper.upcoming-movies .notification');
    for (const notificationIconContainer of notificationIconContainers) {
      notificationIconContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName != 'DIV') {
          target = target.closest('div');
        }
        this.toggleNotificationIcon(target);
        this.updateUpcomingMovies();
      });
    }
  }

  initNotificationIcons() {
    const notifications = this._currentUser.notifications;
    const movieContainers = document.querySelectorAll('.horizontal-scrolling-wrapper.upcoming-movies .movie');
    for (let i = 0; i < notifications.length; i++) {
      for (let j = 0; j < movieContainers.length; j++) {
        const currentMovieContainerUid = movieContainers[j].getAttribute('data-movie-uid');
        if (currentMovieContainerUid === notifications[i].uid) {
          const currentNotificationContainer = movieContainers[j].firstChild;
          currentNotificationContainer.setAttribute('data-is-active', 'true');
          currentNotificationContainer.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg>';
          break;
        }
      }
    }
  }

  toggleNotificationIcon(movieNotificationIconContainer) {
    const isActive = movieNotificationIconContainer.getAttribute('data-is-active');
    if (isActive === 'false') {
      movieNotificationIconContainer.firstChild.innerHTML = /*html*/ `
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg>
      `;
      movieNotificationIconContainer.setAttribute('data-is-active', 'true');
    } else if (isActive === 'true') {
      movieNotificationIconContainer.setAttribute('data-is-active', 'false');
      movieNotificationIconContainer.firstChild.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg>
      `;
    }
  }

  updateUpcomingMovies() {
    const movieContainers = document.querySelectorAll('#home .horizontal-scrolling-wrapper.upcoming-movies .notification');
    const newNotifications = [];
    for (let i = movieContainers.length - 1; i >= 0; i--) {
      const isActive = movieContainers[i].getAttribute('data-is-active');
      const initialIndex = movieContainers[i].getAttribute('data-movie-index');
      if (isActive === 'true') {
        newNotifications.push(this._upcomingMovies[initialIndex]);
      }
    }
    this._currentUser.notifications = newNotifications;
    // this._currentUser.notifications.forEach((element) => console.log(element.title));
  }
}
