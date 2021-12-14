/**
 * @description storage class
 * @export
 * @class StorageService
 */
export default class Storage {
  constructor(router, pages, header, footer, currentUser, users, crew, cast, movies, cinemaEvents, tickets, badges, firebase) {
    this.router = router ?? null;
    this._pages = pages ?? [];
    this._header = header ?? null;
    this._footer = footer ?? null;
    this._currentUser = currentUser ?? null;
    this._users = users ?? [];
    this._crew = crew ?? [];
    this._cast = cast ?? [];
    this._movies = movies ?? [];
    this._cinemaEvents = cinemaEvents ?? [];
    this._tickets = tickets ?? [];
    this._badges = badges ?? [];
    this._firebase = firebase ?? null;
  }

  // router
  get router() {
    return this._router;
  }

  set router(value) {
    this._router = value;
  }

  // pages
  get pages() {
    return this._pages;
  }

  set pages(value) {
    this._pages = value;
  }

  //header
  get header() {
    return this._header;
  }

  set header(value) {
    this._header = value;
  }

  // footer
  get footer() {
    return this._footer;
  }

  set footer(value) {
    this._footer = value;
  }

  // currentUser
  get currentUser() {
    return this._currentUser;
  }

  set currentUser(value) {
    this._currentUser = value;
  }

  // users
  get users() {
    return this._users;
  }

  set users(value) {
    this._users = value;
  }

  // crew
  get crew() {
    return this._crew;
  }

  set crew(value) {
    this._crew = value;
  }

  // cast
  get cast() {
    return this._cast;
  }

  set cast(value) {
    this._cast = value;
  }

  // movies
  get movies() {
    return this._movies;
  }

  set movies(value) {
    this._movies = value;
  }

  // cinemaEvents
  get cinemaEvents() {
    return this._cinemaEvents;
  }

  set cinemaEvents(value) {
    this._cinemaEvents = value;
  }

  // tickets
  get tickets() {
    return this._cinemaEvents;
  }

  set cinemaEvents(value) {
    this._cinemaEvents = value;
  }

  // badges
  get badges() {
    return this._badges;
  }

  set badges(value) {
    this._badges = value;
  }

  // firebase
  get firebase() {
    return this._firebase;
  }
  
  set firebase(value) {
    this._firebase = value;
  }

  findUserWithEmail(email) {
    return this._users.find((element) => element.email === email);
  }

  findCrewMemberWithFullName(fullName) {
    return this._crew.find((element) => element.getFullName().localeCompare(fullName));
  }

  findCastMemberWithFullName(fullName) {
    return this._cast.find((element) => element.getFullName().localeCompare(fullName));
  }

  findMovieWithUid(uid) {
    return this._movies.find((element) => element.uid === uid);
  }

  findMovieWithTitleAndReleaseYear(title, releaseYear) {
    for (const movie of this._movies) {
      let titleEquals = movie.title.localeCompare(title);
      let releaseYearEquals = movie.releaseYear === releaseYear;
      if (titleEquals === 0 && releaseYearEquals) {
        return movie;
      }
    }
    return undefined;
  }

  findCinemaEventWithTitle(title) {
    for (const cinemaEvent of this._cinemaEvents) {
      let titleEquals = cinemaEvent.title.localeCompare(title);
      if (titleEquals === 0) {
        return cinemaEvent;
      }
    }
    return undefined;
  }

  findPageWithConstructorName(constructorName) {
    return this._pages.find((element) => element.constructor.name === constructorName);
  }

  findBadgeWithTitle(title) {
    for (const badge of this._badges) {
      let titleEquals = badges.title.localeCompare(title);
      if (titleEquals === 0) {
        return badge;
      }
    }
    return undefined;
  }
}
