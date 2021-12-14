/**
 * @description search page
 * @export
 * @class PageSearch
 */
export default class PageSearch {
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
          <section id="search" class="page">TODO: Search</section>
          `;
  }
}
