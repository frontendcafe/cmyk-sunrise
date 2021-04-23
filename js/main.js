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
  await loadHtml('landing', '/components/landing.html');
  await wait(3000);

  // setTimeout(async () => {
  //const divLanding = document.querySelector('.landing');
  //divLanding.style.animation = 'fadeOutFromBlock 0.5s ease-out';
  // await wait(500);
  // divLanding.style.display = 'none';

  // const footerWraper = document.getElementById('footer-wraper');

  // await loadHtml('header', '/components/header.html');
  // await loadHtml('totals', '/components/totals.html');
  // document.querySelector('.header').style.display = 'flex';
  // document.querySelector('.totals').style.display = 'block';
  
  // renderTotalsValues();

  // // // Products //
  // await loadHtml('content', '/components/products.html');
  // onLoadProducts();
  // getProducts();
};

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
