import { html, define } from 'hybrids';
import store from '../../store';
import { connectComponent } from '../../connect';
import styles from '../css/bootstrap';


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


const changeSelectedProduct = ({ key, event }) => {
  const { target } = event;
  const payload = {
    key,
    productValue: target.value,
    productName: target[target.selectedIndex].innerText,
  };
};

const renderSelect = ({ products, productCategory, onChange }) => {
  if (!Object.keys(products).length) {
    return html``;
  }
  if (!productCategory) {
    return html``;
  }
  if (!Object.keys(products[productCategory]).length) {
    return html``;
  }
  return html`
  <select class="form-control" onchange=${onChange} >
    <option value="" selected disabled hidden>Escolha um item</option>
    ${Object.keys(products[productCategory]).map(productKey => html`
      <option value=${products[productCategory][productKey]}>${productKey}</option>
    `)}
  </select>
  `;
};

const ProductSelectionContainer = {
  props: {
    products: {},
  },
  actions: {
    changeSelectedProduct: ({ key, value }) => console.log(key, value),
  },
  render: ({ props: { products, cart }, actions }) => html`
  <style>
    ${styles}
  </style>
  ${renderSelect({ products: products.products, productCategory: cart.intendedProduct.productCategory, onChange: (host, e) => actions.changeSelectedProduct({ key: 'selectedProduct', event: e }) })}
  <label for="inputEmail" class="sr-only">'Quantidade de bebida</label>
  <input type="text" id="drinkQuantity" class="form-control" placeholder="Quantidade de bebidas">
  `,
};

const mapDispatchToProps = {
  changeSelectedProduct: ({ key, event }) => changeSelectedProduct({ key, event }),
};

const productSelection = connectComponent(store, mapDispatchToProps, ProductSelectionContainer);

define('app-product-selection', productSelection);
