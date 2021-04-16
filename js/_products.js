import { products } from '/js/_mockProducts.js';

function getItemsToSale() {
  const productsCard = document.querySelectorAll('.products__card');
  const itemsToSale = [];

  productsCard.forEach((product) => {
    const name = product.querySelector('.products__title').textContent;
    const price = Number(product.querySelector('.products__price-value').textContent);
    const amount = Number(product.querySelector('.products__amount').textContent);

    if (amount > 0) itemsToSale.push({ name: name, price: price, amount: amount });
  });

  return itemsToSale;
}

export function onLoadProducts() {
  const registerSaleButton = document.getElementById('register-sale');
  registerSaleButton.addEventListener('click', () => {
    const itemsToSell = getItemsToSale();
    console.log('itemsToSell :>> ', itemsToSell);
  });
}

export function getProducts() {
  const section = document.getElementById('section-produts');
  section.innerHTML = '';
  const template = document.getElementById('template-product-card');

  products.forEach((product) => {
    const productClone = template.content.cloneNode(true);

    const title = productClone.querySelector('.products__title');
    const image = productClone.querySelector('.products__image');
    const price = productClone.querySelector('.products__price-value');

    title.textContent = product.name;
    image.src = product.imageUrl;
    price.textContent = product.price;

    section.appendChild(productClone);
  });

  // add events to increment and decrement buttons
  const productsCard = document.querySelectorAll('.products__card');

  productsCard.forEach((product) => {
    const decreaseButton = product.querySelector('.products__decrease');
    const amount = product.querySelector('.products__amount');
    const increaseButton = product.querySelector('.products__increase');

    decreaseButton.addEventListener('click', () => {
      amount.textContent = Number(amount.textContent) === 0 ? 0 : Number(amount.textContent) - 1;
    });

    increaseButton.addEventListener('click', () => {
      amount.textContent = Number(amount.textContent) + 1;
    });
  });
}
