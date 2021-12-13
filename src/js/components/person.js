/**
 * @description represents a person
 * @constructor
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} imageSource
 * @param {Number} gender - 0 = female, 1 = male
 */
export default class Person {
  constructor(firstName, lastName, imageSource, gender) {
    this._firstName = firstName ?? null;
    this._lastName = lastName ?? null;
    this._imageSource = imageSource ?? null;
    this._gender = gender ?? null;
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

  // first name
  get firstName() {
    return this._firstName;
  }
  set firstName(value) {
    this._firstName = value;
  }

  // last name
  get lastName() {
    return this._lastName;
  }
  set lastName(value) {
    this._lastName = value;
  }

  // imageSource
  get imageSource() {
    return this._imageSource;
  }
  set imageSource(value) {
    this._imageSource = value;
  }

  // gender
  get gender() {
    return this._gender;
  }
  set gender(value) {
    this._gender = value;
  }

  // uid
  get uid() {
    return this._uid;
  }

  set uid(value) {
    this._uid = value;
  }

  getFullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}
