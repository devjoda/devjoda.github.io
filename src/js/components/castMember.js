import CrewMember from './crewMember.js';

/**
 * @description represents a cast member
 * @export
 * @class Actor
 * @extends {CrewMember}
 * @param {String} character
 */
export default class Actor extends CrewMember {
  constructor(firstName, lastName, imageSource, gender, occupation, character) {
    super(firstName, lastName, imageSource, gender, occupation);
    this._character = character ?? null
  }

  // character
  get character() {
    return this._character;
  }

  set character(value) {
    this._character = value;
  }
}
