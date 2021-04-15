import { products } from "/js/_mockProducts.js";

export function sayHello() {
  return products;
}

export function getProducts() {
  const section = document.getElementById("section-produts");
  section.innerHTML = "";
  const template = document.getElementById("template-product-card");

  products.forEach((product) => {
    const productClone = template.content.cloneNode(true);

    const title = productClone.querySelector(".products__title");
    const image = productClone.querySelector(".products__image");
    const price = productClone.querySelector(".products__price-value");

    title.textContent = product.name;
    image.src = product.imageUrl;
    price.textContent = product.price;

    section.appendChild(productClone);
  });

  // add events to increment and decrement buttons
  const productsCard = document.querySelectorAll(".products__card");

  productsCard.forEach(product => product.addEventListener('click', event => {
    console.log(product);
  }));
}
