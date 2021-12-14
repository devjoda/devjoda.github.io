import StorageService from "../../services/storage-service.js";

/**
 * @description movieSlider component
 * @export
 * @class MovieSlider
 */
export default class MovieSlider {
  constructor(domElement) {
    this._domElement = domElement;
    this._movies;
    this._currentIndex = 0;
    this._altGikGodtUid = null;
    this.init();
  }

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  // movies
  get movies() {
    return this._movies;
  }

  set movies(value) {
    this._movies = value;
  }

  // currentIndex
  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(value) {
    this._currentIndex = value;
  }

  // altGikGodtUid
  get altGikGodtUid() {
    return this._altGikGodtUid;
  }

  set altGikGodtUid(value) {
    this._altGikGodtUid = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
    <header id="popular-movies-slider">
      <div class="popular-movies-slider__top">
        <div class="poster__container"></div>
          <div class="info__container">
            <span class="label__popular-now">Populært nu</span>
            <h3 class="movie-title"></h3>
            <div class="tags__container"></div>
          </div>
        </div>
      </div>
      <div class="popular-movies-slider__bottom"></div>
    </header>
    `;
  }

  append(index) {
    this._currentIndex = index;
    const currentMovie = this._movies[this._currentIndex];
    const currentMovieUid = currentMovie.uid;
    // set poster image
    const posterDomElement = document.querySelector('#popular-movies-slider .poster__container');
    posterDomElement.style.backgroundImage = `url(${currentMovie.posterImagePath})`;
    // set uid data attribute
    posterDomElement.setAttribute('data-movie-uid', currentMovieUid);
    // attach event handler
    this.handleOnClickAltGikGodt(currentMovieUid, posterDomElement);
    // set title
    const titleDomElement = document.querySelector('#popular-movies-slider .movie-title');
    titleDomElement.innerText = currentMovie.title;
    // set tags
    const tagsDomElement = document.querySelector('#popular-movies-slider .tags__container');
    tagsDomElement.innerHTML = '';
    currentMovie.tags.map((element) => this.appendTag(tagsDomElement, element));
    // set positionalIndicators
    const bottomDomElement = document.querySelector('#popular-movies-slider .popular-movies-slider__bottom');
    bottomDomElement.innerHTML = '';
    for (let i = 0; i < this.movies.length; i++) {
      if (i === this._currentIndex) {
        bottomDomElement.innerHTML += /*html*/ `
        <a id="positional-indicator__anchor-${i}" href="javascript:void(0)">
          <div class="positional-indicator__active"></div>
        </a>
        `;
      } else {
        bottomDomElement.innerHTML += /*html*/ `
        <a id="positional-indicator__anchor-${i}" href="javascript:void(0)">
          <div class="positional-indicator__inactive"></div>
        </a>
        `;
      }
    }
    for (let i = 0; i < this.movies.length; i++) {
      document.querySelector(`#positional-indicator__anchor-${i}`).addEventListener('click', (element) => {
        this.append(i);
      });
    }
  }

  appendTag(domElement, tagText) {
    domElement.innerHTML += /*html*/ `
    <div class="movie-tag"><span>${tagText}</span></div>
    `;
  }

  startSlideInterval() {
    const locationHash = location.hash;
    let interval = setInterval(() => {
      if (location.hash !== locationHash) {
        clearInterval(interval);
      }
      this.append(this._currentIndex);
      this.incrementCurrentIndex();
    }, 4000);
  }

  stopSlideInterval(interval) {
    clearInterval(interval);
  }

  incrementCurrentIndex() {
    const treshold = this._movies.length;
    if (this._currentIndex + 1 === treshold) {
      this._currentIndex = 0;
    } else {
      this._currentIndex++;
    }
    return this._currentIndex;
  }

  handleOnClickAltGikGodt(currentMovieUid, posterDomElement) {
    if (this._altGikGodtUid) {
      if (this._altGikGodtUid === currentMovieUid) {
        posterDomElement.addEventListener('click', () => {
          StorageService.storage.router.navigateTo(`#/movie-details=${currentMovieUid}`);
        });
      }
    }
  }
}
