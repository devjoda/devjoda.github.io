/**
 * @description benefits page
 * @export
 * @class Benefits
 */
export default class PageBenefits {
  constructor(domElement) {
    this._domElement = domElement;
    this._currentUser = null;
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
    <section id="benefits" class="page">
      <div class="info-message__container">
        <p>Her kan du få et overblik over hvilke fordele, du har adgang til og hvad du kan se frem til, når du stiger i graderne. </p>
          <a href="javascript:void(0)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
          </a>
      </div>
      <div class="user__wrapper">
        <div class="user__container-left">
        <div class="avatar__container">
        <div class="avatar__image"></div>
        <div class="avatar__visits">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
          <span class="visits-text"><span class="visits-count"></span> besøg i år</span>
        </div>
        </div>
        </div>
        <div class="user__container-right">
          <div class="top">
            <div class="title__container">
              <span class="title__rank"></span>
              <span class="title__full-name"></span>
            </div>
            <div class="rank__container"></div>
          </div>
          <div class="middle">
          </div>
          <div class="bottom"></div>
        </div>
      </div>
      <div id="rank__runner" class="rank__wrapper">
        <div class="rank__container">
            <div class="top">
              <h2 class="rank__title">Runner</h2>
              <span class="rank__requirements">(1 - 5 besøg pr. år)</span>
              <div class="rank__image"></div>
            </div>
            <div class="bottom">
              <div class="reward__container">
                <p class="reward__description">1x 5 kr. rabat på billet</p>
              </div>
              <div class="reward__container">
                <p class="reward__description">1x kop kaffe eller te</p>
              </div>
              <div class="reward__container">
                <p class="reward__description">Tidlig adgang til forsalg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="rank__producer" class="rank__wrapper">
        <div class="rank__container">
          <div class="top">
            <h2 class="rank__title">Producer</h2>
            <span class="rank__requirements">(6 - 10 besøg pr. år)</span>
            <div class="rank__image"></div>
          </div>
          <div class="bottom">
            <div class="reward__container">
              <p class="reward__description">1x 10 kr. rabat på billet</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">1x kop kaffe/te & snack</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">1x invitation til surprisevisning</p>
            </div>
          </div>
        </div>
      </div>
      <div id="rank__screenplay-writer" class="rank__wrapper">
        <div class="rank__container">
          <div class="top">
            <h2 class="rank__title">Manuskriptforfatter</h2>
            <span class="rank__requirements">(11 - 15 besøg pr. år)</span>
            <div class="rank__image"></div>
          </div>
          <div class="bottom">
            <div class="reward__container">
              <p class="reward__description">1x 15 kr. rabat på billet</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">1x valgfri platkat</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">1x billet til din fødselsdag</p>
            </div>
          </div>
        </div>
      </div>
      <div id="rank__director" class="rank__wrapper">
        <div class="rank__container">
          <div class="top">
            <h2 class="rank__title">Instruktør</h2>
            <span class="rank__requirements">(16 - 20 besøg pr. år)</span>
            <div class="rank__image"></div>
          </div>
          <div class="bottom">
            <div class="reward__container">
              <p class="reward__description">2x 20 kr.- rabat på billet</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">10% rabat i kiosken</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">Medlemskab til Filmporten</p>
            </div>
          </div>
        </div>
      </div>
      <div id="rank__movie-star" class="rank__wrapper">
        <div class="rank__container">
          <div class="top">
            <h2 class="rank__title">Filmstjerne</h2>
            <span class="rank__requirements">(+20 besøg pr. år)</span>
            <div class="rank__image"></div>
          </div>
          <div class="bottom">
            <div class="reward__container">
              <p class="reward__description">2x 25 kr.- rabat på billet</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">15% rabat i kiosken</p>
            </div>
            <div class="reward__container">
              <p class="reward__description">Tag en ven med for 50%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  appendBenefits(currentUser) {
    this._currentUser = currentUser;
    this.initInfoMessage();
    this.appendUserAvatarImage();
    this.appendUserVisits();
    this.appendUserTitleFullName();
    this.appendUserRank();
    this.appendProgressbar();
    this.appendUserBadges();
    this.appendOverlays();
  }

  appendUserAvatarImage() {
    document.querySelector('#benefits .avatar__image').style.backgroundImage = `url('${this._currentUser.imageSource}')`;
  }

  appendUserVisits() {
    document.querySelector('#benefits .visits-count').innerText = this._currentUser.getYearlyVisits();
  }

  appendUserTitleFullName() {
    document.querySelector('#benefits .title__full-name').innerText = this._currentUser.getFullName();
  }

  appendUserRank() {
    const titleRankContainer = document.querySelector('#benefits .title__rank');
    const rankImageContainer = document.querySelector('#benefits .rank__container');
    const rank = this._currentUser.getRank();
    switch (rank) {
      case 'Runner':
        titleRankContainer.innerText = 'Runner';
        rankImageContainer.style.backgroundImage = `url('./src/img/ranks/runner@3x.png')`;
        break;
      case 'Producer':
        titleRankContainer.innerText = 'Producer';
        rankImageContainer.style.backgroundImage = `url('./src/img/ranks/producer@3x.png')`;
        break;
      case 'ScreenplayWriter':
        titleRankContainer.innerText = 'Manuskriptforfatter';
        rankImageContainer.style.backgroundImage = `url('./src/img/ranks/screenplay-writer@3x.png')`;
        break;
      case 'Director':
        titleRankContainer.innerText = 'Instruktør';
        rankImageContainer.style.backgroundImage = `url('./src/img/ranks/director@3x.png')`;
        break;
      case 'MovieStar':
        titleRankContainer.innerText = 'Filmstjerne';
        rankImageContainer.style.backgroundImage = `url('./src/img/ranks/movie-star@3x.png')`;
        break;
    }
  }

  appendProgressbar() {
    const progressbarContainer = document.querySelector('#benefits .middle');
    const currentRelativeLevel = this._currentUser.getLevelUpProgress();
    progressbarContainer.innerHTML = /*html*/ `
      <progress max="100" value="${currentRelativeLevel}"></progress>
    `;
  }

  appendUserBadges() {
    const badgeContainer = document.querySelector('#benefits .user__container-right .bottom');
    const badges = this._currentUser.badges;
    badgeContainer.innerHTML = '';
    for (const badge of badges) {
      badgeContainer.innerHTML += /*html*/ `
      <div class="badge__container">
        <div class="badge__image" style="background-image: url('${badge.imageSource}')"></div>
        <span class="badge__title">${badge.title}</span>
      </div>
      `;
    }
  }

  initInfoMessage() {
    const infoMessage = document.querySelector('#benefits .info-message__container');
    if (this._currentUser.isInfoMessageDismissed.get('benefits')) {
      infoMessage.style.display = 'none';
    } else {
      document.querySelector('#benefits .info-message__container a').addEventListener('click', () => {
        this._currentUser.isInfoMessageDismissed.set('benefits', true);
        infoMessage.style.display = 'none';
      });
    }
  }

  appendOverlays() {
    const rankWrappers = document.querySelectorAll('#benefits .rank__wrapper');
    const runnerRankContainer = rankWrappers[0];
    const producerRankContainer = rankWrappers[1];
    const screenplayWriterRankContainer = rankWrappers[2];
    const directorRankContainer = rankWrappers[3];
    const movieStarRankContainer = rankWrappers[4];
    const yearlyVisits = this._currentUser.getYearlyVisits();
    if (yearlyVisits < 20) {
      movieStarRankContainer.classList.add('overlay--disabled');
    }
    if (yearlyVisits < 16) {
      directorRankContainer.classList.add('overlay--disabled');
    }
    if (yearlyVisits < 11) {
      screenplayWriterRankContainer.classList.add('overlay--disabled');
    }
    if (yearlyVisits < 6) {
      producerRankContainer.classList.add('overlay--disabled');
    }
    if (yearlyVisits < 1) {
      runnerRankContainer.classList.add('overlay--disabled');
    }
  }
}
