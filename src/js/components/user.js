import Person from './person.js';

/**
 * @description represents a user
 * @export
 * @class User
 * @extends {Person}
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} imageSource
 * @param {Number} gender
 * @param {String} username
 * @param {Object} badges
 * @param {String} email
 * @param {String} phone
 * @param {String} birthDate
 * @param {String} tickets
 * @param {Object} notifications
 * @param {Boolean} isNotifyBySms
 * @param {Boolean} isNotifyByEmail
 * @param {Object} isInfoMessageDismissed
 */
export default class User extends Person {
  constructor(firstName, lastName, imageSource, gender, username, badges, email, phone, birthDate, tickets, notifications, isNotifyBySms, isNotifyByEmail, isInfoMessageDismissed) {
    super(firstName, lastName, imageSource, gender);
    this._username = username ?? null;
    this._badges = badges ?? [];
    this._email = email ?? null;
    this._phone = phone ?? null;
    this._birthDate = birthDate ?? null;
    this._tickets = tickets ?? [];
    this._notifications = notifications ?? [];
    this._isNotifyBySms = isNotifyBySms ?? null;
    this._isNotifyByEmail = isNotifyByEmail ?? null;
    // map of string/booleans to control whether info messages should be derendered
    this._isInfoMessageDismissed = isInfoMessageDismissed ?? new Map();
    this.init();
  }

  // username
  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  //badges
  get badges() {
    return this._badges;
  }

  set badges(value) {
    this._badges = value;
  }

  // email
  get email() {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }

  // phone
  get phone() {
    return this._phone;
  }
  set phone(value) {
    this._phone = value;
  }

  // birthDate
  get birthDate() {
    return this._birthDate;
  }
  set birthDate(value) {
    this._birthDate = value;
  }

  // tickets
  get tickets() {
    return this._tickets;
  }

  set tickets(value) {
    this._tickets = value;
  }

  // notifications
  get notifications() {
    return this._notifications;
  }

  set notifications(value) {
    this._notifications = value;
  }

  // isNotifyBySms
  get isNotifyBySms() {
    return this._isNotifyBySms;
  }

  set isNotifyBySms(value) {
    this._isNotifyBySms = value;
  }

  // isNotifyByEmail
  get isNotifyByEmail() {
    return this._isNotifyByEmail;
  }

  set isNotifyByEmail(value) {
    this._isNotifyByEmail = value;
  }

  // isInfoMessageDismissed
  get isInfoMessageDismissed() {
    return this._isInfoMessageDismissed;
  }
  set isInfoMessageDismissed(value) {
    this._isInfoMessageDismissed = value;
  }

  init() {
    this._isInfoMessageDismissed.set('home', false);
    this._isInfoMessageDismissed.set('notifications', false);
    this._isInfoMessageDismissed.set('benefits', false);
    this._isInfoMessageDismissed.set('tickets', false);
  }

  /**
   * @description calculates current age of User
   * @return {Number}
   * @memberof User
   */
  getAge() {
    if (!this._birthDate) {
      return undefined;
    }
    let date = new Date(this._birthDate);
    // calculate time difference from current date in time in ms
    let differenceInMiliseconds = Date.now() - date.getTime();
    // calculate time difference from current date in unix time
    let differenceInUnixTime = new Date(differenceInMiliseconds);
    // extract birth year
    let birthYear = differenceInUnixTime.getUTCFullYear();
    // calculate time difference from birthday and unix epoch in years
    let differenceInYears = birthYear - 1970;
    let age = Math.abs(differenceInYears);
    return age;
  }

  getYearlyVisits() {
    let count = 0;
    for (const ticket of this._tickets) {
      if (!ticket.isValid()) {
        if (new Date(`${ticket.date}T${ticket.time}`).getFullYear() + 1 > new Date().getFullYear()) {
          count++;
        }
      }
    }
    return count;
  }

  getRank() {
    let yearlyVisits = this.getYearlyVisits();
    if (yearlyVisits <= 5) {
      return 'Runner';
    } else if (yearlyVisits <= 10) {
      return 'Producer';
    } else if (yearlyVisits <= 15) {
      return 'ScreenplayWriter';
    } else if (yearlyVisits <= 20) {
      return 'Director';
    } else {
      return 'MovieStar';
    }
  }

  getLevelUpProgress() {
    let yearlyVisits = this.getYearlyVisits();
    if (yearlyVisits >= 20) {
      return 100;
    } else if (yearlyVisits < 20 && yearlyVisits >= 15) {
      return (yearlyVisits / 5) * 100;
    } else if (yearlyVisits < 15 && yearlyVisits >= 10) {
      return (yearlyVisits / 5) * 100;
    } else if (yearlyVisits < 10 && yearlyVisits >= 5) {
      return (yearlyVisits / 5) * 100;
    } else if (yearlyVisits < 5 && yearlyVisits > 0) {
      return (yearlyVisits / 5) * 100;
    } else {
      return 0;
    }
  }

  /**
   * @description dismisses info message on current url fragment
   * @memberof User
   */
  dismissInfoMessage() {
    const hash = location.hash.substring(2);
    try {
      this._isInfoMessageDismissed.set(hash, true);
    } catch (err) {
      console.log(err);
    }
  }

  addMovieToNotifications(movieUid) {
    // check for duplicate
    const foundDuplicate = this._notifications.some((element) => element.uid === movieUid);
    if (foundDuplicate) {
      // movie already exists
      return false;
    }
    const foundMovie = Storage.storage.findMovieWithUid(movieUid);
    if (!foundMovie) {
      // movie with input uid does not exist in storage
      return false;
    }
    this._notifications.push(foundMovie);
    return true;
  }

  removeMovieFromNotifications(movieUid) {
    // find index of movie
    let foundIndex = this._notifications.findIndex((element) => element.uid === movieUid);
    if (foundIndex === -1) {
      // movie with input uid does not exist in users notifications
      return false;
    }
    array.splice(foundIndex, 1);
    return true;
  }
}
