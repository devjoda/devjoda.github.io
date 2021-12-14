/**
 * @description login page
 * @export
 * @class PageLogin
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
        <h1 class="login-title">Velkommen til Øst for Paradis</h1>
        <section id="firebaseui-auth-container"></section>
        <div><a href="#/home" class="login__skip">Forsæt som gæst</a></span></div>
        <img src="./src/img/login/logo-white@3x.png" alt="Øst for Paradis logo ">
      </div>
    </section>
    `;
  }
}
