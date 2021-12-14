import CrudService from './services/crud-service.js';
import StorageService from './services/storage-service.js';

// initialization
window.addEventListener('DOMContentLoaded', async () => {
  // load dependensies
  await loadFonts();

  // initialize crud service
  CrudService.init();
  window.s = StorageService.storage;
  window.c = CrudService;

  // create badges
  const badge1 = CrudService.createBadge('Founder', './src/img/badges/founder@3x.png');
  const badge2 = CrudService.createBadge('Dramatic', './src/img/badges/drama-queen@3x.png');
  const badge3 = CrudService.createBadge('Francophile', './src/img/badges/mademoiselle@3x.png');

  // create user
  StorageService.storage.currentUser = CrudService.createUser('Signe', 'Studerende', './src/img/pages/benefits/avatar-default-female@3x.png', 0, 'signes90', [badge1, badge2, badge3], 'signe.studerende@example.com', '32435423', '1990-01-01', null, null, true, true, null);

  // create cast members
  const castMember1 = CrudService.createCastMember('Sophie', 'Marceau', './src/img/pages/movie-details/cast/sophie-marceau@3x.png', 1, 'Skuespiller', 'Emmanuèle');
  const castMember2 = CrudService.createCastMember('André', 'Dussollier', './src/img/pages/movie-details/cast/andre-dussollier@3x.png', 0, 'Skuespiller', 'André');
  const castMember3 = CrudService.createCastMember('Géraldine', 'Pailhas', './src/img/pages/movie-details/cast/geraldine-pailhas@3x.png', 1, 'Skuespiller', 'Pascale');
  const castMember4 = CrudService.createCastMember('Charlotte', 'Rampling', './src/img/pages/movie-details/cast/charlotte-rampling@3x.png', 1, 'Skuespiller', 'Claude');
  const castMember5 = CrudService.createCastMember('Grégory', 'Gadebois', './src/img/pages/movie-details/cast/gregory-gadebois@3x.png', 0, 'Skuespiller', 'Gérard');
  const actors = [castMember1, castMember2, castMember3, castMember4, castMember5];

  // create crew members
  const crewMember1 = CrudService.createCrewMember('François', 'Ozonois', './src/img/pages/movie-details/crew/francois-ozonois@3x.png', 0, 'Instruktør');
  const crewMember2 = CrudService.createCrewMember('Eric', 'Altmayer', './src/img/pages/movie-details/crew/eric-altmayer@3x.png', 0, 'Producer');
  const crewMember3 = CrudService.createCrewMember('Nicolas', 'Altmayer', './src/img/pages/movie-details/crew/nicolas-altmayer@3x.png', 0, 'Producer');
  const directors = [crewMember1];
  const producers = [crewMember2, crewMember3];
  const screenplayWriters = [crewMember1];
  
  // create description
  let collapsed = /*html*/ 
  `<h3 class="description__title">Et nyt drama af François Ozon</h3>
  <p>Emmanuèle er romanforfatter og har succes både professionelt og privat. Da hendes far, André på 85 år, får et hjertetilfælde, skynder Emmanuelle sig til hospitalet. Syg og delvist paralyseret beder André sin datter om at gøre en ende på hans liv.</p>
  <div class="img-container"><img src="./src/img/movies/alt-gik-godt-2021/gallery/scene-1@3x.jpg" alt="Foto fra filmen 'Alt gik godt'"></div>`;
  let expanded = /*html*/ 
  `<h3 class="description__title">Et nyt drama af François Ozon</h3>
  <p>Emmanuèle er romanforfatter og har succes både professionelt og privat. Da hendes far, André på 85 år, får et hjertetilfælde, skynder Emmanuelle sig til hospitalet. Syg og delvist paralyseret beder André sin datter om at gøre en ende på hans liv.</p>
  <div class="img-container"><img src="./src/img/movies/alt-gik-godt-2021/gallery/scene-1@3x.jpg" alt="Foto af scene fra filmen 'Alt gik godt'"></div>
  <p>Nu må  Emmanuèle og hendes søster, Pascale, vælge, om de vil imødekomme faderens ønske eller prøve at få ham til at skifte mening. Men hvordan kan man imødekomme sådan et ønske, når der er tale om ens egen far?</p>
  <div class="img-container"><img src="./src/img/movies/alt-gik-godt-2021/gallery/scene-2@3x.jpg" alt="Foto af scene fra filmen 'Alt gik godt'"></div>
  <p>François Ozon har lavet et stærkt og rørende drama, som var nomineret til Den gyldne palme ved Cannes Film Festival.</p>`;
  let description = {
    collapsed,
    expanded,
  };
  
  // create movies
  
  const movie1 = CrudService.createMovie('Trøffeljægerne fra Piemonte', 2021, './src/img/movies/troeffeljaegerne-fra-piemonte-2021/poster/poster-1@3x.jpg', './src/img/movies/troeffeljaegerne-fra-piemonte-2021/backdrop/backdrop-1@3x.jpg', null, null, ['Dokumentar', 'Jagt', 'Feel-Good'], null, null, null, null, null, true);
  
  const movie2 = CrudService.createMovie('Alt gik godt', 2021, './src/img/movies/alt-gik-godt-2021/poster/poster-1@3x.jpg', './src/img/movies/alt-gik-godt-2021/backdrop/backdrop-1@3x.jpg', 'fra 15 år', '1h 53m', ['Drama', 'Fransk', 'Aktiv dødshjælp'], description, actors, directors, producers, screenplayWriters, true);
  
  const movie3 = CrudService.createMovie('The Power of the Dog', 2021, './src/img/movies/the-power-of-the-dog-2021/poster/poster-1@3x.jpg', null, null, null, ['Western', 'Drama', 'Romantik'], null, null, null, null, null, true);

  const movie4 = CrudService.createMovie('Skyggen i mit øje', 2021, './src/img/movies/skyggen-i-mit-oeje-2021/poster/poster-1@3x.jpg', null, null, null, ['Drama', 'Dansk', '2. verdenskrig'], null, null, null, null, null, true);
  
  const movie5 = CrudService.createMovie('The French Dispatch', 2021, './src/img/movies/the-french-dispatch-2021/poster/poster-1@3x.jpg', null, null, null, ['Drama', 'Komedie', 'Romantik'], null, null, null, null, null, true);
  
  const movie6 = CrudService.createMovie('A-ha the Movie', 2021, './src/img/movies/a-ha-the-movie-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie7 = CrudService.createMovie('Titane', 2021, './src/img/movies/titane-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie8 = CrudService.createMovie('Den gyldne jord', 2020, './src/img/movies/den-gyldne-jord-2020/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie9 = CrudService.createMovie('Den Næstsidste', 2020, './src/img/movies/den-næstsidste-2020/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie10 = CrudService.createMovie('Charlatan', 2020, './src/img/movies/charlatan-2020/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie11 = CrudService.createMovie('Venuseffekten', 2021, './src/img/movies/venuseffekten-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie12 = CrudService.createMovie('Pagten', 2021, './src/img/movies/pagten-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie13 = CrudService.createMovie('Margrete den første', 2021, './src/img/movies/margrete-den-foerste-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie14 = CrudService.createMovie('De uskyldige', 2021, './src/img/movies/de-uskyldige-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, true);
  
  const movie15 = CrudService.createMovie('House of Gucci', 2021, './src/img/movies/house-of-gucci-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie16 = CrudService.createMovie('Apples', 2020, './src/img/movies/apples-2020/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie17 = CrudService.createMovie('Invictus', 2009, './src/img/movies/invictus-2009/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie18 = CrudService.createMovie('The American Friend', 1977, './src/img/movies/the-american-friend-1977/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie19 = CrudService.createMovie('Pleasure', 2021, './src/img/movies/pleasure-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie20 = CrudService.createMovie('Gentlemen Prefer Blondes', 1953, './src/img/movies/gentlemen-prefer-blondes-1953/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie21 = CrudService.createMovie('Mr. Turner', 2014, './src/img/movies/mr-turner-2014/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie22 = CrudService.createMovie('The Artist', 2011, './src/img/movies/the-artist-2011/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie23 = CrudService.createMovie('Pig', 2021, './src/img/movies/pig-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie24 = CrudService.createMovie('Echo', 2019, './src/img/movies/echo-2019/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie25 = CrudService.createMovie("Don't look up", 2021, './src/img/movies/dont-look-up-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  const movie26 = CrudService.createMovie('The Hand of God', 2021, './src/img/movies/the-hand-of-god-2021/poster/poster-1@3x.jpg', null, null, null, null, null, null, null, null, null, false);
  
  // bind movies to current user's notifications
  StorageService.storage.currentUser.notifications = [movie15, movie19, movie24, movie25, movie26];
  
  // create events
  const cinemaEvent1 = CrudService.createCinemaEvent('Franske mandage', './src/img/events/franske-mandage/poster/poster-1@3x.jpg', true);
  const cinemaEvent2 = CrudService.createCinemaEvent('Seniorbio', './src/img/events/seniorbio/poster/poster-1@3x.jpg', true);
  const cinemaEvent3 = CrudService.createCinemaEvent('Babybio', './src/img/events/babybio/poster/poster-1@3x.jpg', true);
  const cinemaEvent4 = CrudService.createCinemaEvent('Nordic Adventure Filmfestival', './src/img/events/nordic-adventure-filmfestival/poster/poster-1@3x.jpg', true);
  const cinemaEvent5 = CrudService.createCinemaEvent('Biografklub Danmark', './src/img/events/biografklub-danmark/poster/poster-1@3x.jpg', true);
  const cinemaEvent6 = CrudService.createCinemaEvent('Filmporten', './src/img/events/filmporten/poster/poster-1@3x.jpg', true);
  const cinemaEvent7 = CrudService.createCinemaEvent('Cinemateket i paradis', './src/img/events/cinemateket-i-paradis/poster/poster-1@3x.jpg', true);
  const cinemaEvent8 = CrudService.createCinemaEvent('Søndag i paradis', './src/img/events/soendag-i-paradis/poster/poster-1@3x.jpg');
  const cinemaEvent9 = CrudService.createCinemaEvent('Mine aftener i paradis', './src/img/events/mine-aftener-i-paradis/poster/poster-1@3x.jpg', true);
  
  // create tickets
  const ticket1 = CrudService.createTicket(movie1.uid, StorageService.storage.currentUser.uid, 'Alt gik godt', 'Sal 2', 'C6', '2022-04-01', '21:00');
  
  const ticket2 = CrudService.createTicket(movie1.uid, StorageService.storage.currentUser.uid, 'Alt gik godt', 'Sal 2', 'C7', '2022-04-01', '21:00');
  
  const ticket3 = CrudService.createTicket('g21563dg4', StorageService.storage.currentUser.uid, 'Citizen Kane', 'Sal 5', 'B6', '2021-10-17', '18:30');
  
  const ticket4 = CrudService.createTicket('g21563dg4', StorageService.storage.currentUser.uid, 'Citizen Kane', 'Sal 5', 'B7', '2021-10-17', '18:30');
  
  const ticket5 = CrudService.createTicket('u6g4h6h1a', StorageService.storage.currentUser.uid, 'Spartacus', 'Sal 3', 'C2', '2021-09-08', '12:00');
  
  const ticket6 = CrudService.createTicket('p2f2k3c9z', StorageService.storage.currentUser.uid, 'Parasite', 'Sal 1', 'C6', '2021-05-01', '21:00');
});

async function loadFont(fontname, url) {
  const font = new FontFace(fontname, url);
  await font.load();
  document.fonts.add(font);
}

async function loadFonts() {
  const poppinsFontUrl = "url('https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2')";
  const notableFontUrl = "url('https://fonts.gstatic.com/s/notable/v9/gNMEW3N_SIqx-WX9yHQiFQ.woff2')";
  await loadFont('Poppins-Medium', poppinsFontUrl);
  await loadFont('Notable', notableFontUrl);
}