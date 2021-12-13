/**
 * @description spinner page
 * @export
 * @class Spinner
 */
export default class PageSpinner {
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
            <section class="page spinner">
                <div class="spinner__inner"></div>
            </section>
          `;
  }
}
