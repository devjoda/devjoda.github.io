/**
 * @description tickets page
 * @export
 * @class PageTickets
 */
export default class PageTickets {
  constructor(domElement) {
    this._domElement = domElement;
    this.currentUser = null;
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

  init() {
    this._domElement.innerHTML += /*html*/ `
          <section id="tickets" class="page">
            <div class="info-message__container">
              <p>Her finder du alle dine digitale billetter. Når du ankommer til biografen, skal du bare klikke på billetten og vise den til billetkontrollen.</p>
              <a href="javascript:void(0)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
              </a>
            </div>
            <section id="valid-tickets"></section>
            <section id="old-tickets"></section>
          </section>
          `;
  }

  appendTickets(currentUser) {
    this._currentUser = currentUser;
    this.initInfoMessage();
    this.appendAllTickets();
  }

  appendAllTickets() {
    const currentUserTickets = this._currentUser.tickets;
    const validTicketsSection = document.querySelector('#valid-tickets');
    const oldTicketsSection = document.querySelector('#old-tickets');
    validTicketsSection.innerHTML = '<h2>Dine gyldige billetter</h2>';
    oldTicketsSection.innerHTML = '<h2>Dine gamle billetter</h2>';
    if (currentUserTickets) {
      const validTickets = [];
      const oldTickets = [];
      for (const ticket of currentUserTickets) {
        if (ticket.isValid()) {
          validTickets.push(ticket);
        } else {
          oldTickets.push(ticket);
        }
      }
      for (const validTicket of validTickets) {
        this.appendTicket(validTicket, validTicketsSection, true);
      }
      for (const oldTicket of oldTickets) {
        this.appendTicket(oldTicket, oldTicketsSection, false);
      }
      if (validTickets.length > 0) {
        validTicketsSection.insertAdjacentHTML('beforeend', '<div class="seperator"></div>');
      }

      if (oldTicketsSection.length > 0) {
        oldTicketsSection.insertAdjacentHTML('beforeend', '<div class="seperator"></div>');
      }
    }
  }

  appendTicket(ticket, domElement, isValid) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('ticket');
    canvas.width = 352;
    canvas.height = 139;
    canvas.style.borderRadius = '5px';
    canvas.style.boxShadow = '0px 4px 0px rgba(0, 0, 0, 0.15)';
    domElement.appendChild(canvas);
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      let darkgrey = '#333333';
      this.drawCircle(ctx, 0, 74.5, 28, 0, Math.PI * 2, false, darkgrey);
      this.drawCircle(ctx, 352, 74.5, 28, 0, Math.PI * 2, false, darkgrey);
      this.drawText(ctx, 'Poppins-Medium, sans-serif', '13px', ticket.screen, 0, 20, darkgrey, false);
      this.drawText(ctx, 'Poppins-Medium, sans-serif', '13px', ticket.seat, 312, 20, darkgrey, false);
      this.drawText(ctx, 'Poppins-Medium, sans-serif', '13px', ticket.time, 0, 123, darkgrey, false);
      this.drawText(ctx, 'Poppins-Medium, sans-serif', '13px', ticket.date, 115, 123, darkgrey, false);
      this.drawText(ctx, 'Notable, cursive', '16px', ticket.title, 75, 80, '#111111', true);
      this.drawImage(ctx, './src/img/pages/tickets/logo-black@1x.png', 154, 5, 55, 24);
      if (!isValid) {
        this.drawText(ctx, 'Poppins-Medium, sans-serif', '13px', 'Udløbet', 238, 123, darkgrey, false);
        this.drawImage(ctx, './src/img/pages/tickets/ticket-expired@1x.png', 321, 114, 14, 14);
      }
    }
  }

  drawCircle(ctx, x, y, radius, startAngle, endAngle, counterclockwise, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawText(ctx, fontFamily, fontSize, text, x, y, color, centerText) {
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (centerText) {
      ctx.fillText(text, 176, 69.5);
    } else {
      ctx.fillText(text, x + ctx.measureText(text).width, y);
    }
  }

  drawImage(ctx, imageSource, x, y, width, height) {
    const image = new Image();
    image.src = imageSource;
    image.onload = function () {
      ctx.drawImage(image, x, y, width, height);
    };
  }

  initInfoMessage() {
    const infoMessage = document.querySelector('#tickets .info-message__container');
    if (this._currentUser.isInfoMessageDismissed.get('tickets')) {
      infoMessage.style.display = 'none';
    } else {
      document.querySelector('#tickets .info-message__container a').addEventListener('click', () => {
        this._currentUser.isInfoMessageDismissed.set('tickets', true);
        infoMessage.style.display = 'none';
      });
    }
  }
}
