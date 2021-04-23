import { onLoadProducts, getProducts } from '/js/_products.js';
import { renderTotalsValues } from './_totals.js';

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
  // Landing Screen - step 1 //
  await loadHtml('landing', '/components/landing.html');
  const divLanding = document.querySelector('.landing');
  divLanding.style.display = 'block';

  // const footerWraper = document.getElementById('footer-wraper');

  // Header & Totals Panel Info //
  await loadHtml('header', '/components/header.html');
  await loadHtml('totals', '/components/totals.html');

  renderTotalsValues();

  // Products //
  await loadHtml('content', '/components/products.html');
  onLoadProducts();
  getProducts();

  // Landing Screen - step 2 //
  document.querySelector('.header').style.display = 'flex';
  document.querySelector('.totals').style.display = 'block';
  await wait(3000);
  divLanding.style.animation = 'fadeOutFromBlock 0.5s ease-out';
  await wait(500);
  divLanding.style.display = 'none';
};

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
