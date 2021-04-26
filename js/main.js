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
  goToLanding();
};

async function goToLanding(){
  // Landing Screen - step 1 //
  await loadHtml('landing', '/components/landing.html');
  setDisplay('.landing', 'block');

  // Header //
  await loadHtml('header', '/components/header.html');

  // Totals Panel Info //
  await loadHtml('totals', '/components/totals.html');
  renderTotalsValues();

  // Summary //
  await loadHtml('content', '/components/summary.html');

  // Products //
  // await loadHtml('content', '/components/products.html');
  // onLoadProducts();
  // getProducts();

  // Landing Screen - step 2 transition to Home//
  await wait(3000);
  setAnimation('.landing', 'fadeOutFromBlock 0.5s ease-out');
  setDisplay('.header', 'flex');
  setDisplay('.totals', 'block');
  setDisplay('#content', 'grid');
  await wait(500);
  setDisplay('.landing', 'none');

}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const setDisplay = (div, style) => (document.querySelector(div).style.display = style);
const setAnimation = (div, animation) => (document.querySelector(div).style.animation = animation);
