/**
 * @description represents an event
 * @constructor
 * @param {String} title
 * @param {String} posterImagePath
 * @param {Boolean} isShowing
 */
export default class CinemaEvent {
  constructor(title, posterImagePath, isShowing) {
    this._title = title ?? null;
    this._posterImagePath = posterImagePath ?? null;
    this._isShowing = isShowing ?? null;
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

  // title
  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  // posterImagePath
  get posterImagePath() {
    return this._posterImagePath;
  }

  set posterImagePath(value) {
    this._posterImagePath = value;
  }

  // isShowing
  get isShowing() {
    return this._isShowing;
  }

  set isShowing(value) {
    this._isShowing = value;
  }

  // uid
  get uid() {
    return this._uid;
  }

  set uid(value) {
    this._uid = value;
  }
}
