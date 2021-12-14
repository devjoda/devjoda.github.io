import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js';

import { getFirestore, collection, doc, onSnapshot, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';

import StorageService from '../services/storage-service.js';

export default class Firebase {
  constructor() {
    this._router = StorageService.storage.router;
    this._firebaseConfig = {
      apiKey: 'AIzaSyDuyMe1iCK6GZ5erfnUAH0kpPixibS1p2c',
      authDomain: 'advanced-frontend-exam.firebaseapp.com',
      databaseURL: 'https://advanced-frontend-exam-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'advanced-frontend-exam',
      storageBucket: 'advanced-frontend-exam.appspot.com',
      messagingSenderId: '985949406869',
      appId: '1:985949406869:web:d778fda8b3ec4ebbe93d9c',
    };
    this._firebaseUI;
    this._auth;
    this._db;
    this._usersRef;
    this._users = [];
    this.init();
  }

  // users
  get users() {
    return this._users;
  }

  set users(value) {
    this._users = value;
  }

  // router
  get router() {
    return this._router;
  }

  set router(value) {
    this._router = value;
  }

  // firebaseConfig
  get firebaseConfig() {
    return this._firebaseConfig;
  }

  set firebaseConfig(value) {
    this._firebaseConfig = value;
  }

  // firebaseUI
  get firebaseUI() {
    return this._firebaseUI;
  }

  set firebaseUI(value) {
    this._firebaseUI = value;
  }

  // auth
  get auth() {
    return this._auth;
  }

  set auth(value) {
    this._auth = value;
  }

  // db
  get db() {
    return this._db;
  }

  set db(value) {
    this._db = value;
  }

  // usersRef
  get usersRef() {
    return this._usersRef;
  }

  set usersRef(value) {
    this._usersRef = value;
  }

  init() {
    try {
      this.showLoader(true);
      initializeApp(this._firebaseConfig);
      this._auth = getAuth();
      firebase.initializeApp(this._firebaseConfig);
      onAuthStateChanged(this._auth, (user) => {
        if (user) {
          this.userAuthenticated(user);
        } else {
          this.userNotAuthenticated();
        }
      });
      this._db = getFirestore();
      this._usersRef = collection(this._db, 'users');
      onSnapshot(this._usersRef, (snapshot) => {
        // mapping snapshot data from firebase in to user objects
        this._users = snapshot.docs.map((doc) => {
          const user = doc.data();
          user.id = doc.id;
          return user;
        });
        this.showLoader(false);
      });
      document.querySelector('#btn-logout').onclick = () => this.logout();
      window.createUser = () => this.createUser();
    } catch (err) {
      console.log(err);
      // navigate to home
      this._router.navigateTo('#/home');
    }
  }

  userAuthenticated(user) {
    this._router.navigateTo('#/home');
    this.showLoader(false);
  }

  userNotAuthenticated() {
    this._router.navigateTo('#/login');
    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '#/home',
    };
    if (!this._firebaseUI) {
      this._firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this._firebaseUI.start('#firebaseui-auth-container', uiConfig);
    this.showLoader(false);
  }

  logout() {
    signOut(this._auth);
  }

  showLoader(show) {
    if (show) {
      this._router.showLoader();
    } else {
      this._router.hideLoader();
    }
  }

  async getUserData() {
    const authUser = this._auth.currentUser;
    const docRef = doc(this._usersRef, authUser.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    return {
      ...authUser,
      ...userData,
    };
  }

  async createUser() {
    const user = await getUserData();
    const userToCreate = {
      name: user.name || user.displayName,
      email: user.email,
      birthdate: document.querySelector('#birthdate').value,
      phonenumber: document.querySelector('#phonenumber').value,
    };
    const userRef = doc(this._usersRef, this._auth.currentUser.uid);
    await setDoc(userRef, userToCreate, { merge: true });
    this._router.navigateTo('#/');
    this.showLoader(false);
  }
}
