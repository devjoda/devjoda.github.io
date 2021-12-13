import Person from './person.js';

/**
 * @description represents a crew member
 * @export
 * @class CrewMember
 * @extends {Person}
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} imageSource
 * @param {Number} gender
 * @param {String} occupation
 */
export default class CrewMember extends Person {
  constructor(firstName, lastName, imageSource, gender, occupation) {
    super(firstName, lastName, imageSource, gender);
    this._occupation = occupation ?? null;
  }

  // occupation
  get occupation() {
    return this._occupation;
  }

  set occupation(value) {
    this._occupation = value;
  }
}
