import { summarySales } from './_totals.js';

export function getTable() {
  let sales = document.getElementById('sales');
  sales.innerHTML = `
      <tr class="sales__items">
        <th class="sales__time">Movimientos</th>
        <th class="sales__quantity">Unidades</th>
        <th class="sales__amount">Total</th>
      </tr>`;
  let saleNumber = 1;
  summarySales.forEach((item) => {
    sales.innerHTML += `<tr class="sales__row">
        <td class="sales__time">Venta ${saleNumber}</td>
        <td class="sales__quantity">${item.quantity}</td>
        <td class="sales__amount">$${item.amount}</td>
      </tr>`;
    saleNumber++;
  });
}
