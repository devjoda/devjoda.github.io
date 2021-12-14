import Header from '../components/domElements/header.js';
import Footer from '../components/domElements/footer.js';
import PageLogin from '../pages/login.js';
import PageHome from '../pages/home.js';
import PageNotifications from '../pages/notifications.js';
import PageBenefits from '../pages/benefits.js';
import PageTickets from '../pages/tickets.js';
import PageSearch from '../pages/search.js';
import PageSpinner from '../pages/spinner.js';
import Router from '../components/router.js';
import StorageService from './storage-service.js';
import Storage from '../components/storage.js';
import User from '../components/user.js';
import Ticket from '../components/ticket.js';
import CastMember from '../components/castMember.js';
import CrewMember from '../components/crewMember.js';
import Movie from '../components/movie.js';
import CinemaEvent from '../components/cinemaEvent.js';
import Badge from '../components/badge.js';
import Firebase from '../components/firebase.js';
import PageMovieDetails from '../pages/movie-details.js';
import PageBooking from '../pages/booking.js';

/**
 * @description service methods for creating, reading, updating and deleting objects
 * @export
 * @class CrudService
 */
export default class CrudService {
  static verbose = true;

  static init() {
    this.createStorage();
    this.createHeader();
    this.createPages();
    this.createFooter();
    this.createRouter();
    this.createFirebase();
  }

  static createStorage() {
    const storage = new Storage();
    StorageService.storage = storage;
    // print verbose
    this.printVerboseMessage('[Created Storage]', '#000000', '#FFB72B');
    return storage;
  }

  static createHeader(title) {
    const header = new Header(document.body, title);
    // bind header to storage
    StorageService.storage.header = header;
    // print verbose
    this.printVerboseMessage('[Created Header]', '#000000', '#FFB72B');
    return header;
  }

  static createFooter() {
    const footer = new Footer(document.body);
    // bind header to storage
    StorageService.storage.footer = footer;
    // print verbose
    this.printVerboseMessage('[Created Footer]', '#000000', '#FFB72B');
    return footer;
  }

  static createPages() {
    // create main / pages wrapper
    const main = document.createElement('main');
    main.id = 'pages';
    document.body.appendChild(main);
    // create pages
    const spinner = new PageSpinner(main);
    const login = new PageLogin(main);
    const home = new PageHome(main);
    const notifications = new PageNotifications(main);
    const benefits = new PageBenefits(main);
    const tickets = new PageTickets(main);
    const movieDetails = new PageMovieDetails(main);
    const search = new PageSearch(main);
    const booking = new PageBooking(main);
    // bind pages to storage
    const pages = [spinner, login, home, notifications, benefits, tickets, movieDetails, search];
    StorageService.storage.pages = pages;
    // print verbose
    this.printVerboseMessage('[Created Pages]', '#000000', '#FFB72B');
    return pages;
  }

  static createRouter() {
    const router = new Router();
    StorageService.storage.router = router;
    // print verbose
    this.printVerboseMessage('[Created Router]', '#000000', '#FFB72B');
    return router;
  }

  static createFirebase() {
    const firebase = new Firebase();
    StorageService.storage.firebase = firebase;
    // print verbose
    this.printVerboseMessage('[Created Firebase]', '#000000', '#FFB72B');
    return firebase;
  }

  static createUser(firstName, lastName, imageSource, gender, username, badges, email, phone, birthDate, tickets, notifications, isNotifyBySMS, isNotifyByEmail, isInfoMessageDismissed) {
    // create user
    const user = new User(firstName, lastName, imageSource, gender, username, badges, email, phone, birthDate, tickets, notifications, isNotifyBySMS, isNotifyByEmail, isInfoMessageDismissed);
    // prevent duplicates
    let foundUser = StorageService.storage.findUserWithEmail(user.email);
    if (foundUser) {
      return foundUser;
    }
    // bind to storage
    StorageService.storage.users.push(user);
    // print verbose
    this.printVerboseMessage('[Created User]', '#000000', '#FFB72B');
    return user;
  }

  static createCastMember(firstName, lastName, imageSource, gender, occupation, character) {
    // create castMember
    const castMember = new CastMember(firstName, lastName, imageSource, gender, occupation, character);
    // prevent duplicates
    let foundCastMember = StorageService.storage.findCastMemberWithFullName(castMember.getFullName());
    if (foundCastMember) {
      return foundCastMember;
    }
    // bind to storage
    StorageService.storage.cast.push(castMember);
    // print verbose
    this.printVerboseMessage('[Created CastMember]', '#000000', '#FFB72B');
    return castMember;
  }

  static createCrewMember(firstName, lastName, imageSource, gender, occupation) {
    // create crewMember
    const crewMember = new CrewMember(firstName, lastName, imageSource, gender, occupation);
    // prevent duplicates
    let foundCrewMember = StorageService.storage.findCrewMemberWithFullName(crewMember.getFullName());
    if (foundCrewMember) {
      return foundCrewMember;
    }
    // bind to storage
    StorageService.storage.crew.push(crewMember);
    // print verbose
    this.printVerboseMessage('[Created CrewMember]', '#000000', '#FFB72B');
    return crewMember;
  }

  static createMovie(title, releaseYear, posterImagePath, backdropImagePath, rating, duration, tags, description, actors, directors, producers, screenplayWriters, isShowing) {
    // create movie
    const movie = new Movie(title, releaseYear, posterImagePath, backdropImagePath, rating, duration, tags, description, actors, directors, producers, screenplayWriters, isShowing);
    // prevent duplicates
    let foundMovie = StorageService.storage.findMovieWithTitleAndReleaseYear(movie.title, movie.releaseYear);
    if (foundMovie) {
      return foundMovie;
    }
    // bind to storage
    StorageService.storage.movies.push(movie);
    // print verbose
    this.printVerboseMessage('[Created Movie]', '#000000', '#FFB72B');
    return movie;
  }

  static createCinemaEvent(title, posterImagePath, isShowing) {
    // create cinema event
    const cinemaEvent = new CinemaEvent(title, posterImagePath, isShowing);
    // prevent duplicates
    let foundEvent = StorageService.storage.findCinemaEventWithTitle(cinemaEvent.title);
    if (foundEvent) {
      return foundEvent;
    }
    // bind to storage
    StorageService.storage.cinemaEvents.push(cinemaEvent);
    // print verbose
    this.printVerboseMessage('[Created CinemaEvent]', '#000000', '#FFB72B');
    return cinemaEvent;
  }

  static createTicket(movieUid, userUid, title, screen, seat, date, time) {
    // create ticket
    const ticket = new Ticket(movieUid, userUid, title, screen, seat, date, time);
    // bind ticket to user
    const foundUser = StorageService.storage.users.find((element) => element.uid === userUid);
    if (foundUser) {
      foundUser.tickets.push(ticket);
    }
    // bind ticket to storage
    StorageService.storage.tickets.push(ticket);
    // print verbose
    this.printVerboseMessage('[Created Ticket]', '#000000', '#FFB72B');
    return ticket;
  }

  static createBadge(title, imageSource) {
    // create badge
    const badge = new Badge(title, imageSource);
    // bind badge to storage
    StorageService.storage.badges.push(badge);
    // print verbose
    this.printVerboseMessage('[Created Badge]', '#000000', '#FFB72B');
    return badge;
  }

  /**
   * @description logs verbose messages if this.verbose is truthy
   * @static
   * @param {String} message
   * @param {String} backgroundColor - hex value
   * @param {String} color - hex value
   * @memberof CrudService
   */
  static printVerboseMessage(message, backgroundColor, color) {
    if (this.verbose) {
      console.log(`%c ${message} `, `background: ${backgroundColor}; color: ${color}`);
    }
  }
}
