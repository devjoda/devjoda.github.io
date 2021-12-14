/**
 * @description movie details page
 * @export
 * @class PageMovieDetails
 */
export default class PageMovieDetails {
  constructor(domElement) {
    this._domElement = domElement;
    this._currentUser = null;
    this._movie = null;
    this._isDescriptionStateCollapsed = true;
    this.init();
  }

  //currentUser
  get currentUser() {
    return this._currentUser;
  }

  set currentUser(value) {
    this._currentUser = value;
  }

  //movie
  get movie() {
    return this._movie;
  }

  set movie(value) {
    this._movie = value;
  }

  //current

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  //isDescriptionState
  get isDescriptionStateCollapsed() {
    return this._isDescriptionStateCollapsed;
  }

  set isDescriptionStateCollapsed(value) {
    this._isDescriptionStateCollapsed = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
    <section id="movie-details" class="page">
      <header class="details__hero"><div class="details__movie-poster"></div></header>   
      <a class="details__booking-button .nav-link" href="#/booking">Book nu</a> 
      <section class="details__wrapper">
        <div class="details__container details">
            <h2 class="details__title"></h2>
            <div class="details__keywords">
            <ul class="details__keyword-list">
            <li class="details__keyword-release-year"></li>
            <li class="details__keyword-rating"></li>
            <li class="details__keyword-duration"></li>
            </ul>
        </div>
        <div class="details__tags"></div>
        <div class="details__container description">
          <div class="details__description-wrapper"></div>
          <a class="details__description-state-toggle" href="javascript:void(0)"></a>
        </div>
        <div class="details__container people">
          <h3 class="details__actors-title"></h3>
          <div class="details__actors-wrapper horizontal-scrolling-wrapper"></div>
          <h3 class="details__directors-title"></h3>
          <div class="details__directors-wrapper horizontal-scrolling-wrapper"></div>
          <h3 class="details__producers-title"></h3>
          <div class="details__producers-wrapper horizontal-scrolling-wrapper"></div>
          <h3 class="details__screenplay-writers-title"></h3>
          <div class="details__screenplay-writers-wrapper horizontal-scrolling-wrapper"></div>
        </div>
     </section>
    `;
  }

  appendMovieDetails(currentUser, movie) {
    this._currentUser = currentUser;
    this._movie = movie;
    this.appendHeroImage();
    this.appendTitle();
    this.appendTags();
    this.appendKeywords();
    this.appendDescription();
    this.appendActors();
    this.appendDirectors();
    this.appendProducers();
    this.appendScreenplayWriters();
    this.handleOnClickDescriptionStateToggle();
    this.appendMoviePoster();
  }

  appendHeroImage() {
    const heroContainer = document.querySelector('#movie-details .details__hero');
    const backdropImagePath = this._movie.backdropImagePath;
    heroContainer.style.backgroundImage = `url('${backdropImagePath}')`;
  }

  appendTitle() {
    const mainHeading = document.querySelector('#movie-details .details__container.details .details__title');
    mainHeading.innerText = this._movie.title;
  }
  appendKeywords() {
    const keywordsListItems = document.querySelectorAll('#movie-details .details__container.details .details__keyword-list li');
    keywordsListItems[0].innerText = this._movie.releaseYear;
    keywordsListItems[1].innerText = this._movie.rating;
    keywordsListItems[2].innerText = this._movie.duration;
  }
  appendTags() {
    const tagContainer = document.querySelector('#movie-details .details__wrapper .details__tags');
    tagContainer.innerHTML = '';
    const tags = this._movie.tags;
    for (const tag of tags) {
      tagContainer.innerHTML += /*html*/ `
            <div class="details__tag">${tag}</div>
        `;
    }
  }
  appendDescription() {
    const descriptionWrapper = document.querySelector('#movie-details .details__wrapper .details__description-wrapper');
    const descriptionStateToggle = document.querySelector('#movie-details .details__wrapper .details__description-state-toggle');
    if (this._isDescriptionStateCollapsed === true) {
      descriptionWrapper.innerHTML = this._movie.description.collapsed;
      descriptionStateToggle.innerText = 'Læs mere';
    } else {
      descriptionWrapper.innerHTML = this._movie.description.expanded;
      descriptionStateToggle.innerText = 'Læs mindre';
    }
  }

  appendActors() {
    const actors = this._movie.actors;
    const actorsHeading = document.querySelector('#movie-details .details__wrapper .details__actors-title');
    if (actors.length > 0) {
      actorsHeading.innerText = 'Skuespillere';
    }
    const actorsContainer = document.querySelector('#movie-details .details__wrapper .details__actors-wrapper');
    actorsContainer.innerHTML = '';
    for (const actor of actors) {
      actorsContainer.innerHTML += /*html*/ `
            <div class="details__person-wrapper">
                <div class="details__person-img" style="background-image: url('${actor.imageSource}');"></div>
                <div class="details__person-text-1">${actor.getFullName()}</div>
                <div class="details__person-text-2">${actor.character}</div>
            </div>
        `;
    }
  }
  appendDirectors() {
    const directors = this._movie.directors;
    const directorsHeading = document.querySelector('#movie-details .details__wrapper .details__directors-title');
    if (directors.length > 0) {
      directorsHeading.innerText = 'Instruktion';
    }
    const directorsContainer = document.querySelector('#movie-details .details__wrapper .details__directors-wrapper');
    directorsContainer.innerHTML = '';
    for (const director of directors) {
      directorsContainer.innerHTML += /*html*/ `
        <div class="details__person-wrapper">
            <div class="details__person-img" style="background-image: url('${director.imageSource}');"></div>
            <div class="details__person-text-1">${director.getFullName()}</div>
            <div class="details__person-text-2">${director.occupation}</div>
        </div>
    `;
    }
  }
  appendProducers() {
    const producers = this._movie.producers;
    const producersHeading = document.querySelector('#movie-details .details__wrapper .details__producers-title');
    if (producers.length > 0) {
      producersHeading.innerText = 'Produktion';
    }
    const producersContainer = document.querySelector('#movie-details .details__wrapper .details__producers-wrapper');
    producersContainer.innerHTML = '';
    for (const producer of producers) {
      producersContainer.innerHTML += /*html*/ `
        <div class="details__person-wrapper">
            <div class="details__person-img" style="background-image: url('${producer.imageSource}');"></div>
            <div class="details__person-text-1">${producer.getFullName()}</div>
            <div class="details__person-text-2">${producer.occupation}</div>
        </div>
    `;
    }
  }
  appendScreenplayWriters() {
    const screenplaywriters = this._movie.screenplayWriters;
    const screenplayWritersHeading = document.querySelector('#movie-details .details__wrapper .details__screenplay-writers-title');
    if (screenplaywriters.length > 0) {
      screenplayWritersHeading.innerText = 'Manuskript';
    }
    const screenplayWritersContainer = document.querySelector('#movie-details .details__wrapper .details__screenplay-writers-wrapper');
    screenplayWritersContainer.innerHTML = '';
    for (const screenplayWriter of screenplaywriters) {
      screenplayWritersContainer.innerHTML += /*html*/ `
        <div class="details__person-wrapper">
            <div class="details__person-img" style="background-image: url('${screenplayWriter.imageSource}');"></div>
            <div class="details__person-text-1">${screenplayWriter.getFullName()}</div>
            <div class="details__person-text-2">${screenplayWriter.occupation}</div>
        </div>
    `;
    }
  }

  toggleDescriptionState() {
    this._isDescriptionStateCollapsed = !this._isDescriptionStateCollapsed;
  }

  handleOnClickDescriptionStateToggle() {
    //remove old eventlisteners
    const oldDescriptionStateToggle = document.querySelector('#movie-details .details__wrapper .details__description-state-toggle');
    const newDescriptionToggle = oldDescriptionStateToggle.cloneNode(true);
    oldDescriptionStateToggle.parentNode.replaceChild(newDescriptionToggle, oldDescriptionStateToggle);
    // add event listener
    newDescriptionToggle.addEventListener('click', () => {
        this.toggleDescriptionState();
        this.appendDescription();
    });
  }

  appendMoviePoster() {
      const moviePoster = document.querySelector('#movie-details .details__movie-poster');
      moviePoster.style.backgroundImage = `url('${this._movie.posterImagePath}')`;
  }
}
