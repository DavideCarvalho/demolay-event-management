import { html, define } from 'hybrids';
import store from '../../store';
import { connectComponent } from '../../connect';


/* <select value="" onchange="" class="form-control" id="selectedDrink">
    <option value="" selected disabled hidden>Escolha uma bebida</option>
    <option value="agua">Água</option>
    <option value="suco">Suco</option>
    <option value="refrigerante">Refrigerante</option>
    <option value="cerveja">Cerveja</option>
    <option value="caipirinha">Caipirinha</option>
    <option value="caipiroska">Caipiroska</option>
    <option value="batida">Batida</option>
  </select>
  <br /> */

const renderSelect = ({ products, whatToBuy }) => {
  if (!Object.keys(products).length) {
    return html``;
  }
  if (!whatToBuy) {
    return html``;
  }
  if (!Object.keys(products[whatToBuy]).length) {
    return html``;
  }
  return html`
  <select class="form-control">
    ${Object.keys(products[whatToBuy]).map(productKey => html`
      <option value=${products[whatToBuy][productKey]}>${productKey}</option>
    `)}
  </select>
  `;
};

const ProductSelectionContainer = {
  props: {
    products: {},
  },
  actions: {
  },
  render: ({ props }) => html`
  ${renderSelect({ products: props.products.products, whatToBuy: props.buy.whatToBuy })}
  <label for="inputEmail" class="sr-only">'Quantidade de bebida</label>
  <input type="text" id="drinkQuantity" class="form-control" placeholder="Quantidade de bebidas">
  `,
};

const productSelection = connectComponent(store, {}, ProductSelectionContainer);

define('app-product-selection', productSelection);
