/**
 * @description header component
 * @export
 * @class Header
 */
export default class Header {
  constructor(domElement, title) {
    this._domElement = domElement;
    this._title = title || 'Hjem';
    this.init();
  }

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  // title
  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
      <header class="main-header">
        <a class="nav-link" href="#/home">
          <div class="logo__container"></div>  
        </a>
        <h1>${this._title}</h1>
        <nav>
          <a class="nav-link" href="#/search">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill:#fff"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/></svg>
          </a>
          <a href="javascript:void(0)" id="btn-logout"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg></a>
        </nav>
      </header>
      `;
  }

  updateTitle(title) {
    this._title = title;
    document.querySelector('.main-header h1').innerText = title;
  }
}
