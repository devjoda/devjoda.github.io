/**
 * @description booking page
 * @export
 * @class PageBooking
 */
export default class PageBooking {
  constructor(domElement) {
    this._domElement = domElement;
    this.init();
  }

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
          <section id="booking" class="page">TODO: Booking</section>
          `;
  }
}
