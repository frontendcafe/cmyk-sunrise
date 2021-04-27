import { renderTotals } from './_totals.js';

const db = firebase.firestore();
let totalSaleSum = 0;
let cantProductsSaleSum = 0;

function removeCurrentData(tableBody) {
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

function populateTableWithNewData(tableBody) {
  const productsCard = document.querySelectorAll('.products__card');
  const templateRow = document.getElementById('confirm-sale-template-row');
  const totalSale = document.querySelector('.confirm-sale__total-sale');

  productsCard.forEach((product) => {
    const name = product.querySelector('.products__title').textContent;
    const price = Number(product.querySelector('.products__price-value').textContent);
    const amount = Number(product.querySelector('.products__amount').textContent);

    if (amount > 0) {
      const rowClone = templateRow.content.cloneNode(true);

      const nameTemplate = rowClone.querySelector('.confirm-sale__name');
      const amountTemplate = rowClone.querySelector('.confirm-sale__amount');
      const totalTemplate = rowClone.querySelector('.confirm-sale__total');

      nameTemplate.textContent = name;
      amountTemplate.textContent = amount;
      totalTemplate.textContent = `$ ${price * amount}`;

      totalSaleSum += price * amount;
      cantProductsSaleSum += amount;

      tableBody.appendChild(rowClone);
    }
  });

  totalSale.textContent = `$ ${totalSaleSum}`;
}

function saveSale() {
  db.collection('sales')
    .add({
      amount: totalSaleSum,
      quantity: cantProductsSaleSum,
      time: Date().toString(),
    })
    .then(() => {
      console.log('Venta registrada !!');
    })
    .catch((error) => {
      alert('Error al registrar la venta.');
      console.error('Error adding document: ', error);
    });
}

export function onLoadProducts() {
  const registerSaleButton = document.getElementById('register-sale');
  const sectionConfirmSale = document.getElementById('section-confirm-sale');
  const tableBody = document.querySelector('.confirm-sale__table-body');

  const registerSaleCancelButton = document.querySelector('.confirm-sale__buttons-cancel');
  const registerSaleConfirmButton = document.querySelector('.confirm-sale__buttons-confirm');

  registerSaleButton.addEventListener('click', () => {
    window.scroll({ top: 40, left: 0, behavior: 'smooth' });

    sectionConfirmSale.classList.add('confirm-sale-active');

    removeCurrentData(tableBody);
    populateTableWithNewData(tableBody);
  });

  registerSaleCancelButton.addEventListener('click', () => {
    sectionConfirmSale.classList.remove('confirm-sale-active');
  });

  registerSaleConfirmButton.addEventListener('click', saveSale);
}

export function getProducts() {
  const section = document.getElementById('section-produts');
  section.innerHTML = '';
  const template = document.getElementById('template-product-card');

  db.collection('products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const productClone = template.content.cloneNode(true);

        const title = productClone.querySelector('.products__title');
        const image = productClone.querySelector('.products__image');
        const price = productClone.querySelector('.products__price-value');
        const decreaseButton = productClone.querySelector('.products__decrease');
        const amount = productClone.querySelector('.products__amount');
        const increaseButton = productClone.querySelector('.products__increase');

        title.textContent = doc.data().name;
        image.src = doc.data().imageUrl;
        price.textContent = doc.data().price;

        decreaseButton.addEventListener('click', () => {
          amount.textContent =
            Number(amount.textContent) === 0 ? 0 : Number(amount.textContent) - 1;
          renderTotals('products');
        });

        increaseButton.addEventListener('click', () => {
          amount.textContent = Number(amount.textContent) + 1;
          renderTotals('products');
        });

        section.appendChild(productClone);
      });
    });
}
