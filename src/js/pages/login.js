/**
 * @description login page
 * @export
 * @class Login
 */
export default class PageLogin {
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
    <section id="login" class="page"> 
      <div class="login__wrapper">
        <section id="firebaseui-auth-container"></section>
        <div><a href="#/home" class="login__skip">Forsæt som gæst</a></span></div>
      </div>
    </section>
    `;
  }
}
