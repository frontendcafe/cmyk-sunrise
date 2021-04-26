let totals = {
  globalUnits: 0,
  globalSales: 0,
  globalTotalMoney: 0,
  currentUnits: 0,
  currentTotalMoney: 0,
};
let summarySales = [];

export { summarySales };

const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

// renderTotals: inyects the values in both mobile and desktop divs:

export function renderTotals(whichPage) {
  switch (whichPage) {
    case 'products':
      renderCurrentTotals();
      break;

    case 'home':
      renderGlobalTotals();
      break;

    default:
      break;
  }
}

// renderGlobalTotals: used in home page
//      extract data from firebase DB
function renderGlobalTotals() {
  // console.log('[ renderTotals() ]', totals);
  const { globalTotalMoney, globalSales, globalUnits } = totals;

  const uiTotals = document.querySelector('.totals');

  const uiTotalAmount = uiTotals.querySelectorAll('.totals__total-money');
  uiTotalAmount.forEach((element) => (element.textContent = formatter.format(globalTotalMoney)));

  const uiUnits = uiTotals.querySelectorAll('.totals__units');
  uiUnits.forEach((element) => (element.textContent = globalUnits));

  const uiTotalSales = uiTotals.querySelector('.totals__total-sales');

  //_totals.js:49 Uncaught (in promise) TypeError: Cannot set property 'textContent' of null
  // uiTotalSales.textContent = globalSales;
}

// renderCurrentTotals: used in products page,
//    extract data from products selected.
export function renderCurrentTotals() {
  updateProductsChosen();
  // console.log('[ renderTotals() ]', totals);
  const { currentTotalMoney, currentUnits } = totals;

  const uiTotals = document.querySelector('.totals');

  const uiTotalMoney = uiTotals.querySelectorAll('.totals__total-money');
  uiTotalMoney.forEach((element) => (element.textContent = formatter.format(currentTotalMoney)));

  const uiUnits = uiTotals.querySelectorAll('.totals__units');
  uiUnits.forEach((element) => (element.textContent = currentUnits));
}

// updateProductsChosen: used in products page,
//   travels for all product cards and see if it was chosen
function updateProductsChosen() {
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

export function onLoadTotalsConfig(whichPage) {
  // mobile laoyut references:
  const uiTotalsMobile = document.querySelector('.totals__mobile');
  const uiTotalsMobileTitle = document.querySelector('.totals__box--title');
  uiTotalsMobile.dataset.layout = whichPage;
  uiTotalsMobileTitle.dataset.layout = whichPage;

  // desktop layout references:
  const uiSubtitleUnits = document.querySelector('.totals__subtitle--units');
  const uiTotalsDesktop = document.querySelector('.totals__desktop');
  const uiTotalsBox = document.querySelectorAll('.totals__box');

  uiTotalsDesktop.dataset.layout = whichPage;
  uiTotalsBox.forEach((element) => (element.dataset.layout = whichPage));

  switch (whichPage) {
    case 'products':
      uiSubtitleUnits.textContent = 'Cantidad de items';
      break;

    case 'home':
      uiSubtitleUnits.textContent = 'Unidades';
      break;

    default:
      break;
  }
}

export async function dbGetTotalSales() {
  const db = firebase.firestore();

  let registerSale = {
    amount: 0,
    quantity: 0,
    time: 0,
  };

  await db
    .collection('sales')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((register) => {
        registerSale.amount = register.data().amount;
        registerSale.quantity = register.data().quantity;
        registerSale.time = register.data().time;
        //console.log(registerSale);
        summarySales.push({ ...registerSale });
      });
      console.log('summarySales:', summarySales);
      totals.globalUnits = summarySales.reduce((acc, item) => (acc = acc + item.quantity), 0);
      totals.globalTotalMoney = summarySales.reduce((acc, item) => (acc = acc + item.amount), 0);
      totals.globalSales = summarySales.length;
      //      console.log(totals);
    })
    .catch((error) => console.error('[dbGetTotalSales]:', error));
}
