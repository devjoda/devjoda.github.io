/**
 * @description represents a ticket
 * @constructor
 * @param {String} movieUid
 * @param {String} userUid
 * @param {String} title
 * @param {String} screen
 * @param {String} seat
 * @param {String} date
 * @param {String} time
 */
export default class Ticket {
  constructor(movieUid, userUid, title, screen, seat, date, time) {
    this._movieUid = movieUid ?? null;
    this._userUid = userUid ?? null;
    this._title = title ?? null;
    this._screen = screen ?? null;
    this._seat = seat ?? null;
    this._date = date ?? null;
    this._time = time ?? null;
    // define a globally unique identifier property
    Object.defineProperty(this, 'uid', {
      // non-rfc compliant guid generation (...but good enough for our scope)
      value: Math.random().toString(36).substr(2, 9),
      // property should not be changed/deleted
      configurable: false,
      // property should not be changed with assignment operator
      writable: false,
      // property should show up during enumeration of the property
      enumerable: true,
    });
  }

  // movieUid
  get movieUid() {
    return this._movieUid;
  }
  set name(value) {
    this._movieUid = value;
  }

  // userUid
  get userUid() {
    return this._userUid;
  }
  set userUid(value) {
    this._userUid = value;
  }

  // title
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  // screen
  get screen() {
    return this._screen;
  }
  set screen(value) {
    this._screen = value;
  }

  // seat
  get seat() {
    return this._seat;
  }
  set seat(value) {
    this._seat = value;
  }

  // date
  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }

  // time
  get time() {
    return this._time;
  }
  set time(value) {
    this._time = value;
  }

  // uid
  get uid() {
    return this._uid;
  }

  set uid(value) {
    this._uid = value;
  }

  /**
   * @description returns true if ticket is valid
   * @return {Boolean}
   * @memberof Ticket
   */
  isValid() {
    return new Date(`${this._date}T${this._time}`) > new Date();
  }
}
