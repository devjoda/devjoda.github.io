/**
 * @description notifications page
 * @export
 * @class PageNotifications
 */
export default class PageNotifications {
  constructor(domElement) {
    this._domElement = domElement;
    this._currentUser = null;
    this._initialNotifications = [];
    this.init();
  }

  // domElement
  get domElement() {
    return this._domElement;
  }

  set domElement(value) {
    this._domElement = value;
  }

  // currentUser
  get currentUser() {
    return this._currentUser;
  }

  set currentUser(value) {
    this._currentUser = value;
  }

  // initialNotifications
  get initialNotifications() {
    return this._initialNotifications;
  }

  set initialNotifications(value) {
    this._initialNotifications = value;
  }

  init() {
    this._domElement.innerHTML += /*html*/ `
    <section id="notifications" class="page">
      <div class="info-message__container">
        <p>Her kan slå påmindelser til og fra. Påmindelser sendes ud 1 uge før filmpremieren.</p>
        <a href="javascript:void(0)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
        </a>
      </div>
      <h2>Mine påmindelser</h2>
      <label class="toggle-switch__container sms" for="checkbox__sms">
        <input id="checkbox__sms" type="checkbox">
        <span class="control"></span>
        <span class="text__label"></span>
      </label>
      <label class="toggle-switch__container email" for="checkbox__email">
        <input id="checkbox__email" type="checkbox">
        <span class="control"></span>
        <span class="text__label"></span>
      </label>
      <div class="movies__container"></div>
    </section>
    `;
  }

  appendNotifications(currentUser) {
    this._currentUser = currentUser;
    this.initMovies();
    this.initToggleSwitches();
    this.initInfoMessage();
  }

  initMovies() {
    const movies = this._currentUser.notifications;
    this._initialNotifications = movies;
    const moviesContainer = document.querySelector('#notifications .movies__container');
    moviesContainer.innerHTML = '';
    for (let i = movies.length - 1; i >= 0; i--) {
      moviesContainer.innerHTML += `
      <div data-movie-uid="${movies[i].uid}" class="movie"><div data-is-active="true" data-movie-index="${i}" class="notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg></div></div>
      `;
      // set notification posters
      let movie = document.querySelector(`#notifications [data-movie-uid="${movies[i].uid}"]`);
      movie.style.backgroundImage = `url('${movies[i].posterImagePath}')`;
    }
    // bind eventlistener to notification icon
    const movieNotificationIconContainers = document.querySelectorAll('#notifications .movies__container .notification');
    for (const movieNotificationIconContainer of movieNotificationIconContainers) {
      movieNotificationIconContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName != 'DIV') {
          target = target.closest('div');
        }
        this.toggleNotificationIcon(target);
        this.updateMovies();
      });
    }
  }

  toggleNotificationIcon(movieNotificationIconContainer) {
    const isActive = movieNotificationIconContainer.getAttribute('data-is-active');
    if (isActive === 'false') {
      movieNotificationIconContainer.firstChild.innerHTML = /*html*/ `
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></svg>
      `;
      movieNotificationIconContainer.setAttribute('data-is-active', 'true');
    } else if (isActive === 'true') {
      movieNotificationIconContainer.setAttribute('data-is-active', 'false');
      movieNotificationIconContainer.firstChild.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg>
      `;
    }
  }

  updateMovies() {
    const movieContainers = document.querySelectorAll('#notifications .movies__container div.notification');
    const newNotifications = [];
    for (let i = movieContainers.length - 1; i >= 0; i--) {
      const isActive = movieContainers[i].getAttribute('data-is-active');
      const initialIndex = movieContainers[i].getAttribute('data-movie-index');
      if (isActive === 'true') {
        newNotifications.push(this._initialNotifications[initialIndex]);
      }
    }
    this._currentUser.notifications = newNotifications;
    // this._currentUser.notifications.forEach(element => console.log(element.title));
  }

  initToggleSwitches() {
    this.initSmsNotificationSwitch();
    this.initEmailNotificationSwitch();
  }

  initSmsNotificationSwitch() {
    const smsToggleSwitch = document.querySelector('.toggle-switch__container.sms input');
    // remove old event listeners
    let newSmsToggleSwitch = smsToggleSwitch.cloneNode(true);
    smsToggleSwitch.parentNode.replaceChild(newSmsToggleSwitch, smsToggleSwitch);
    const smsToggleLabel = document.querySelectorAll(`#notifications .text__label`)[0];
    this.syncSmsNotificationSwitch(newSmsToggleSwitch, smsToggleLabel);
    newSmsToggleSwitch.addEventListener('click', (event) => {
      this.updateSmsNotificationSwitch(smsToggleLabel);
      this._currentUser.isNotifyBySms = !this._currentUser.isNotifyBySms;
    });
  }

  syncSmsNotificationSwitch(smsToggleSwitch, smsToggleLabel) {
    if (this._currentUser.isNotifyBySms) {
      smsToggleSwitch.checked = true;
      smsToggleLabel.innerText = 'SMS påmindelser slået til';
    } else {
      smsToggleLabel.innerText = 'SMS påmindelser slået fra';
      smsToggleSwitch.checked = false;
    }
  }

  updateSmsNotificationSwitch(smsToggleLabel) {
    if (this._currentUser.isNotifyBySms) {
      smsToggleLabel.innerText = 'SMS påmindelser slået fra';
    } else {
      smsToggleLabel.innerText = 'SMS påmindelser slået til';
    }
  }

  initEmailNotificationSwitch() {
    const emailToggleSwitch = document.querySelector('.toggle-switch__container.email input');
    // remove old event listeners
    let newEmailToggleSwitch = emailToggleSwitch.cloneNode(true);
    emailToggleSwitch.parentNode.replaceChild(newEmailToggleSwitch, emailToggleSwitch);
    const emailToggleLabel = document.querySelectorAll(`#notifications .text__label`)[1];
    this.syncEmailNotificationSwitch(newEmailToggleSwitch, emailToggleLabel);
    newEmailToggleSwitch.addEventListener('click', (event) => {
      this.updateEmailNotificationSwitch(emailToggleLabel);
      this._currentUser.isNotifyByEmail = !this._currentUser.isNotifyByEmail;
    });
  }

  syncEmailNotificationSwitch(emailToggleSwitch, emailToggleLabel) {
    if (this._currentUser.isNotifyByEmail) {
      emailToggleSwitch.checked = true;
      emailToggleLabel.innerText = 'Email påmindelser slået til';
    } else {
      emailToggleLabel.innerText = 'Email påmindelser slået fra';
      emailToggleSwitch.checked = false;
    }
  }

  updateEmailNotificationSwitch(emailToggleLabel) {
    if (this._currentUser.isNotifyByEmail) {
      emailToggleLabel.innerText = 'Email påmindelser slået fra';
    } else {
      emailToggleLabel.innerText = 'Email påmindelser slået til';
    }
  }

  initInfoMessage() {
    const infoMessage = document.querySelector('#notifications .info-message__container');
    if (this._currentUser.isInfoMessageDismissed.get('notifications')) {
      infoMessage.style.display = 'none';
    } else {
      document.querySelector('#notifications .info-message__container a').addEventListener('click', () => {
        this._currentUser.isInfoMessageDismissed.set('notifications', true);
        infoMessage.style.display = 'none';
      });
    }
  }
}
