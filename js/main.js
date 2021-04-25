import { onLoadProducts, getProducts } from '/js/_products.js';
import { onLoadTotalsConfig, renderTotals, dbGetTotalSales } from './_totals.js';

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
  document.getElementById('header').innerHTML = 'LANDING';
  // document.getElementById('totals').innerHTML = '';
  await loadHtml('totals', '/components/landing.html');
};

export const goToHome = async function () {
  //  // Header //
  await loadHtml('header', '/components/header.html');

  // Totals Panel//
  await loadHtml('totals', '/components/totals.html');
  onLoadTotalsConfig('home'); //set appropriated layout (which screen)
  await dbGetTotalSales();
  renderTotals('home'); // inyect values in DOM

  // Products //
  await loadHtml('content', '/components/products.html');
  onLoadProducts();
  getProducts();
};
