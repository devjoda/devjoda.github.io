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
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0 5.5228-4.4772 10-10 10-5.5229 0-10-4.4772-10-10C2 6.4771 6.4771 2 12 2c5.5228 0 10 4.4771 10 10Z" fill="#fff"/><circle cx="11.8947" cy="11.8947" r="7.8947" fill="#fff"/><path d="M8.3185 13.9229h1.5869c.0508.4189.2666.7574.6475 1.0156.3808.2539.8527.3808 1.4155.3808.5501 0 .9987-.1227 1.3457-.3681.3512-.2455.5268-.5586.5268-.9395 0-.3301-.1269-.5967-.3808-.7998-.2539-.2073-.6686-.3787-1.2442-.5141l-1.187-.2793c-.8421-.1947-1.4684-.4973-1.8789-.9078-.4062-.4104-.6093-.9436-.6093-1.5996 0-.8082.3173-1.4642.9521-1.9677.6348-.5036 1.4536-.7554 2.4565-.7554 1.0072 0 1.8176.2497 2.4312.749.6178.4951.9373 1.1468.9585 1.955h-1.5615c-.0381-.4273-.2222-.7616-.5523-1.0028-.3301-.2455-.7596-.3682-1.2885-.3682-.5163 0-.9353.1164-1.2569.3491-.3174.2328-.4761.5396-.4761.9204 0 .3047.1228.5523.3682.7427.2497.1904.6559.3534 1.2188.4888l1.0537.2412c.9267.2116 1.5996.5205 2.0185.9267.419.4063.6284.9501.6284 1.6314 0 .8675-.3258 1.5573-.9775 2.0693-.6475.5078-1.5256.7617-2.6343.7617-1.0579 0-1.9085-.2433-2.5517-.7299-.639-.4909-.9755-1.1574-1.0093-1.9995Z" fill="#111"/></svg>
        </nav>
      </header>
      `;
  }

  updateTitle(title) {
    this._title = title;
    document.querySelector('.main-header h1').innerText = title;
  }
}
