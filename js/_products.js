const db = firebase.firestore();

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

    const sectionConfirmSale = document.getElementById('section-confirm-sale');
    sectionConfirmSale.classList.add("confirm-sale-active")
  });
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
        });

        increaseButton.addEventListener('click', () => {
          amount.textContent = Number(amount.textContent) + 1;
        });

        section.appendChild(productClone);
      });
    }); 
}
