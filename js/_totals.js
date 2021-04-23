import { totals } from './_mockTotals.js';

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

// renderTotals: inyects the values in both mobile and desktop divs:
export function renderTotalsValues() {
  console.log('[ renderTotals() ]', totals);
  const { totalAmount, totalSales, units } = totals;

  const uiTotals = document.querySelector('.totals');

  const uiTotalAmount = uiTotals.querySelectorAll('.totals__total-amount');
  uiTotalAmount.forEach((element) => (element.textContent = formatter.format(totalAmount)));

  const uiUnits = uiTotals.querySelectorAll('.totals__units');
  uiUnits.forEach((element) => (element.textContent = units));

  const uiTotalSales = uiTotals.querySelector('.totals__total-sales');
  uiTotalSales.textContent = totalSales;
}

function updateProductsChosen() {
  let totalSaleSum = 0;
  let cantProductsSaleSum = 0;
  const productsCard = document.querySelectorAll('.products__card');
  // const templateRow = document.getElementById('confirm-sale-template-row');
  // const totalSale = document.querySelector('.confirm-sale__total-sale');

  productsCard.forEach((product) => {
    //const name = product.querySelector('.products__title').textContent;
    const price = Number(product.querySelector('.products__price-value').textContent);
    const amount = Number(product.querySelector('.products__amount').textContent);

    if (amount > 0) {
      // const rowClone = templateRow.content.cloneNode(true);

      // const nameTemplate = rowClone.querySelector('.confirm-sale__name');
      // const amountTemplate = rowClone.querySelector('.confirm-sale__amount');
      // const totalTemplate = rowClone.querySelector('.confirm-sale__total');

      // nameTemplate.textContent = name;
      // amountTemplate.textContent = amount;
      // totalTemplate.textContent = `$ ${price * amount}`;

      totalSaleSum += price * amount;
      cantProductsSaleSum += amount;

      // tableBody.appendChild(rowClone);
    }
  });
  totals = {
    units: cantProductsSaleSum,
    totalSales: totalSaleSum,
  };
  // totalSale.textContent = `$ ${totalSaleSum}`;
}
