import { html, define } from 'hybrids';
import store from '../../store';
import { connectComponent } from '../../connect';
import { fetchProducts } from '../../actions/ProductsActions';
import { changeEntryState } from '../../actions/BuyActions';
import { changeIntendedProductCategory } from '../../actions/CartActions';
import RadioComponent from '../components/RadioComponent';
import styles from '../css/bootstrap';
import ComprarComponentStyles from '../ComprarComponentStyles';

store.dispatch(fetchProducts());

const AvaliableProductsContainer = {
  props: {
    buy: {
      commandNumber: '',
      sweetQuantity: '',
      whatToBuy: '',
      drink: '',
      drinkQuantity: '',
      selectedDrink: '',
      loading: false,
    },
    products: {},
  },
  actions: {
    changeState: ({ key, value }) => console.log(key, value),
    changeIntendedProductCategory: ({ productCategory }) => console.log(productCategory),
  },
  render: ({ props: { products, cart }, actions }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <div class="container text-center">
    <div class="row">
      ${
        Object.keys(products.products).map(productCategory => html`
          <div class="col-sm">
            ${RadioComponent({ radioLabel: productCategory, value: productCategory, onChange: actions.changeIntendedProductCategory({ productCategory }), checked: cart.intendedProduct.productCategory === productCategory })}
          </div>
        `)
      }
    </div>
  </div>
`,
};

const mapDispatchToProps = {
  changeState: ({ key, value }) => () => store.dispatch(changeEntryState({ key, value })),
  changeIntendedProductCategory: ({ productCategory }) => () => store.dispatch(changeIntendedProductCategory({ productCategory })),
};

const avaliableProducts = connectComponent(store, mapDispatchToProps, AvaliableProductsContainer);

define('app-avaliable-products', avaliableProducts);
