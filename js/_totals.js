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

export function renderTotals(whichPage) {
  switch (whichPage) {
    case 'products':
      renderCurrentTotals();
      break;

    case 'home':
      break;

    default:
      break;
  }
}

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
  updateProductsChosen();
  console.log('[ renderTotals() ]', totals);
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

export function dbGetTotalSales() {
  const db = firebase.firestore();
  let amount, quantity, time;
  let summarySales = [];
  let registerSale = {
    amount,
    quantity,
    time,
  };

  db.collection('sales')
    .get()
    .then((response) => {
      response.forEach((register) => {
        amount = register.data().amount;
        quantity = register.data().quantity;
        time = register.data().time;
        registerSale = {
          amount,
          quantity,
          time,
        };
        console.log(registerSale);
        summarySales = [...summarySales, registerSale];
      });
      console.log (summarySales);
    });

    var scoresRef = firebase.database().ref("sales");
    scoresRef.orderByValue().limitToLast(3).on("time", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("The " + data.key + " time is " + data.val());
      });
    });
}
