import { onLoadProducts, getProducts } from '/js/_products.js';
import { onLoadTotalsConfig, renderTotals, dbGetTotalSales } from './_totals.js';
import { onLoadHeaderConfig } from '/js/_header.js';
import Router from './router.js';
import { PATHS } from './routes.js';
import { getTable } from './_sales.js';

const ROUTER = new Router(PATHS);

export const loadHtml = async function (parentElementId, filePath) {
  const init = {
    method: 'GET',
    headers: { 'Content-Type': 'text/html' },
    mode: 'cors',
    cache: 'default',
  };
  const req = new Request(filePath, init);
  await fetch(req)
    .then(function (response) {
      return response.text();
    })
    .then(function (body) {
      // Replace `#` char in case the function gets called `querySelector` or jQuery style
      if (parentElementId.startsWith('#')) {
        parentElementId.replace('#', '');
      }
      document.getElementById(parentElementId).innerHTML = body;
    });
};

window.onload = async function () {
  const page = ROUTER.getRoute();
  ROUTER.goToRoute(page);
};

window.onpopstate = () => {
  const page = ROUTER.getRoute();
  ROUTER.goToRoute(page, true);
};

export async function goToHome() {
  // First, make invisible all divs
  //setDisplay('.header', 'none');
  setDisplay('.totals', 'none');
  setDisplay('#content', 'none');

  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('home');

  //menu mobile
  await loadHtml('menuMobile', '/components/menuMobile.html');
  menuMobileListener();


  // Totals Panel Info //
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('home'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('home'); // inyect values in DOM

  document.getElementById('content').innerHTML = '';

  // Sales //  console.log('entra a sales');
  await loadHtml('content', '/components/sales.html');
  getTable();
  document.querySelector('#sale').addEventListener('click', () => {
    ROUTER.goToRoute('sale');
  });

  setDisplay('.header', 'flex');
  setDisplay('.totals', 'block');
  setDisplay('#content', 'grid');
}

export async function goToSale() {
  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('products');
  document.querySelector('.header__icon').addEventListener('click', () => {
    ROUTER.goToRoute('home');
  });

  // Totals Panel//
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('products'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('products'); // inyect values in DOM

  // Products //
  await loadHtml('content', '/components/products.html');
  onLoadProducts();
  getProducts();

  document.querySelector('#confirm-sale__Button-Confirm').addEventListener('click', () => {
    console.log('di click en buttonConfirm');
    ROUTER.goToRoute('home');
  });

  setDisplay('.header', 'flex');
  setDisplay('.totals', 'block');
  setDisplay('#content', 'grid');
}

export async function goToLanding() {
  // First, make invisible all divs
  setDisplay('.header', 'none');
  setDisplay('.totals', 'none');
  setDisplay('#content', 'none');

  // Landing Screen - step 1 //
  await loadHtml('landing', '/components/landing.html');
  setDisplay('.landing', 'block');

  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('home');

  //menu mobile
  await loadHtml('menuMobile', '/components/menuMobile.html');
  menuMobileListener();

  // Totals Panel Info //
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('home'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('home'); // inyect values in DOM

  // Sales //
  await loadHtml('content', '/components/sales.html');
  getTable();
  document.querySelector('#sale').addEventListener('click', () => {
    ROUTER.goToRoute('sale');
  });

  // Landing Screen - step 2 transition to Home Screen //
  await wait(3000);
  setAnimation('.landing', 'fadeOutFromBlock 0.5s ease-out');
  setDisplay('.header', 'flex');
  setDisplay('.totals', 'block');
  setDisplay('#content', 'grid');
  await wait(500);
  setDisplay('.landing', 'none');
}

export async function goToAbout() {
  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('about');
  document.querySelector('.header__icon').addEventListener('click', () => {
    ROUTER.goToRoute('home');
  });

  // Totals Panel//
  setDisplay('.totals', 'none');

  // About //
  await loadHtml('content', '/components/aboutUs.html');

  setDisplay('.header', 'flex');
  setDisplay('.totals', 'none');
  setDisplay('#content', 'grid');
}

export function goToError() {
  location.href = 'error.html';
}

// Helpers
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function menuMobileListener(){
  document.querySelector('.header__icon').addEventListener('click',()=>{
    document.querySelector('#menu').classList.add("show");
    const btnSale = document.querySelector('#sale');
    btnSale.disabled=true;
    btnSale.classList.add('opacity');
  });
  document.querySelector('.menu__anchor-close').addEventListener('click',()=>{
    document.querySelector('#menu').classList.remove('show');
    const btnSale = document.querySelector('#sale');
    btnSale.disabled=false;
    btnSale.classList.remove('opacity');    
  });
  document.querySelector('.menu__anchor-products').addEventListener('click', () => {
    document.querySelector('#menu').classList.remove('show');
    ROUTER.goToRoute('sale');
  });
  document.querySelector('.menu__anchor-aboutUs').addEventListener('click', () => {
    document.querySelector('#menu').classList.remove('show');
    ROUTER.goToRoute('about');
  });
}

const setDisplay = (div, style) => (document.querySelector(div).style.display = style);
const setAnimation = (div, animation) => (document.querySelector(div).style.animation = animation);


