/**
 * @description represents a movie
 * @constructor
 * @param {String} title
 * @param {String} releaseYear
 * @param {String} posterImagePath
 * @param {String} backdropImagePath
 * @param {String} rating
 * @param {String} duration
 * @param {Object} tags
 * @param {Object} description
 * @param {Object} actors
 * @param {Object} directors
 * @param {Object} producers
 * @param {Object} screenplayWriters
 * @param {Boolean} isShowing
 */
export default class Movie {
  constructor(title, releaseYear, posterImagePath, backdropImagePath, rating, duration, tags, description, actors, directors, producers, screenplayWriters, isShowing) {
    this._title = title ?? null;
    this._releaseYear = releaseYear ?? null;
    this._posterImagePath = posterImagePath ?? null;
    this._backdropImagePath = backdropImagePath ?? null;
    this._rating = rating ?? null;
    this._duration = duration ?? null;
    this._tags = tags ?? null;
    this._description = description ?? null;
    this._actors = actors ?? null;
    this._directors = directors ?? null;
    this._producers = producers ?? null;
    this._screenplayWriters = screenplayWriters ?? null;
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

  // releaseYear
  get releaseYear() {
    return this._releaseYear;
  }

  set releaseYear(value) {
    this._releaseYear = value;
  }

  // posterImagePath
  get posterImagePath() {
    return this._posterImagePath;
  }

  set posterImagePath(value) {
    this._posterImagePath = value;
  }

  // backdropImagePath
  get backdropImagePath() {
    return this._backdropImagePath;
  }

  set backdropImagePath(value) {
    this._backdropImagePath = value;
  }

  // rating
  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
  }

  // duration
  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
  }

  // tags
  get tags() {
    return this._tags;
  }

  set tags(value) {
    this._tags = value;
  }

  // description
  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  // actors
  get actors() {
    return this._actors;
  }

  set actors(value) {
    this._actors = value;
  }

  // directors
  get directors() {
    return this._directors;
  }

  set directors(value) {
    this._directors = value;
  }

  // producers
  get producers() {
    return this._producers;
  }

  set producers(value) {
    this._producers = value;
  }

  // screenplayWriters
  get screenplayWriters() {
    return this._screenplayWriters;
  }

  set screenplayWriters(value) {
    this._screenplayWriters = value;
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
