/**
 * @description movie details page
 * @export
 * @class PageMovieDetails
 */
 export default class PageMovieDetails {
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
    <section id="movie-details" class="page">
        
    </section>
    `;
    }

    appendMovieDetails() {
        console.log('test');
    }
  }