import { onLoadProducts, getProducts } from '/js/_products.js';
import { renderCurrentTotals } from './_totals.js';

const loadHtml = async function (parentElementId, filePath) {
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
  await loadHtml('header', '/components/header.html');
  await loadHtml('totals', '/components/totals.html');

  renderCurrentTotals();

  // Products //
  await loadHtml('content', '/components/products.html');
  onLoadProducts();
  getProducts();
};
