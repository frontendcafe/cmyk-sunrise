let totals = {
  globalUnits: 0,
  globalSales: 0,
  globalTotalMoney: 0,
  currentUnits: 0,
  currentTotalMoney: 0,
};

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

// renderTotals: inyects the values in both mobile and desktop divs:

// renderGlobalTotals: used in home page
//      extract data from firebase DB
export function renderGlobalTotals() {
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

// renderCurrentTotals: used in products page, 
//    extract data from products selected.
export function renderCurrentTotals() {
  console.log('[ renderTotals() ]', totals);
  const { currentTotalMoney, currentUnits } = totals;

  const uiTotals = document.querySelector('.totals');

  const uiTotalMoney = uiTotals.querySelectorAll('.totals__total-money');
  uiTotalMoney.forEach((element) => (element.textContent = formatter.format(currentTotalMoney)));

  const uiUnits = uiTotals.querySelectorAll('.totals__units');
  uiUnits.forEach((element) => (element.textContent = currentUnits));
}

export function updateProductsChosen() {
  let totalSaleSum = 0;
  let cantProductsSaleSum = 0;
  const productsCard = document.querySelectorAll('.products__card');

  productsCard.forEach((product) => {
    const price = Number(product.querySelector('.products__price-value').textContent);
    const amount = Number(product.querySelector('.products__amount').textContent);

    if (amount > 0) {
      totalSaleSum += price * amount;
      cantProductsSaleSum += amount;
    }
  });
  totals = {
    currentUnits: cantProductsSaleSum,
    currentTotalMoney: totalSaleSum,
  };
}
