import { onLoadProducts, getProducts } from '/js/_products.js';
import { onLoadTotalsConfig, renderTotals, dbGetTotalSales } from './_totals.js';
import { onLoadHeaderConfig } from '/js/_header.js';
import Router from './router.js';
import { PATHS } from './routes.js';

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

  goToLanding();
};

export const buttonHome = function () {
  goToHome();
};

export const buttonSale = function () {
  goToSale();
};

export const goToHome = async function () {
  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('home');

  // Totals Panel Info //
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('home'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('home'); // inyect values in DOM

  // Summary //
  await loadHtml('content', '/components/summary.html');
  document.querySelector('#sale').addEventListener('click', () => {
    goToSale();
  });

  ROUTER.load('home');
};

export const goToSale = async function () {
  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('products');
  document.querySelector('.header__icon').addEventListener('click', () => {
    goToHome();
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

  ROUTER.load('sale');
};

async function goToLanding() {
  // Landing Screen - step 1 //
  await loadHtml('landing', '/components/landing.html');
  setDisplay('.landing', 'block');

  // Header //
  await loadHtml('header', '/components/header.html');
  onLoadHeaderConfig('home');

  // Totals Panel Info //
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('home'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('home'); // inyect values in DOM

  // Summary //
  await loadHtml('content', '/components/summary.html');
  document.querySelector('#sale').addEventListener('click', () => {
    goToSale();
  });

  // Landing Screen - step 2 transition to Home //
  await wait(3000);
  setAnimation('.landing', 'fadeOutFromBlock 0.5s ease-out');
  setDisplay('.header', 'flex');
  setDisplay('.totals', 'block');
  setDisplay('#content', 'grid');
  await wait(500);
  setDisplay('.landing', 'none');
}



// Helpers
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const setDisplay = (div, style) => (document.querySelector(div).style.display = style);
const setAnimation = (div, animation) => (document.querySelector(div).style.animation = animation);
