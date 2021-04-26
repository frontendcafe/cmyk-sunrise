import { onLoadProducts, getProducts } from '/js/_products.js';
import { onLoadTotalsConfig, renderTotals, dbGetTotalSales } from './_totals.js';
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
  await loadHtml('totals', '/components/landing.html');
  document.querySelector('#Home').addEventListener('click', () => {
    goToHome();
  });
};

export const buttonHome = function () {
  goToHome();
};

export const buttonSale = function () {
  goToSale();
};

export const goToHome = async function () {
  //  // Header //
  await loadHtml('header', '/components/header.html');

  await loadHtml('totals', '/components/summary.html');
  renderTotals('home'); // inyect values in DOM

  document.querySelector('#Sale').addEventListener('click', () => {
    goToSale();
  });

  ROUTER.load('home');
};

export const goToSale = async function () {
  //  // Header //
  await loadHtml('header', '/components/header.html');

  // Totals Panel//
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('products'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('products'); // inyect values in DOM

  // Summary //
  await loadHtml('content', '/components/summary.html');

  // Products //
  await loadHtml('content', '/components/products.html');
  onLoadProducts();
  getProducts();

  ROUTER.load('sale');
};
