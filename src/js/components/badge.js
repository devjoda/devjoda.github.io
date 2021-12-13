/**
 * @description represents a badge
 * @constructor
 * @param {String} title
 * @param {String} imageSource
 */
export default class Badge {
  constructor(title, imageSource) {
    this._title = title ?? null;
    this._imageSource = imageSource ?? null;
  }

  // title
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  // imageSource
  get imageSource() {
    return this._imageSource;
  }
  set imageSource(value) {
    this._imageSource = value;
  }
}
