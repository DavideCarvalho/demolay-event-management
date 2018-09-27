import { html, define } from 'hybrids';
import store from '../../store';
import { connectComponent } from '../../connect';
import { fetchProducts } from '../../actions/ProductsActions';
import { changeEntryState } from '../../actions/BuyActions';
import RadioComponent from '../components/RadioComponent';
import styles from '../css/bootstrap';
import ComprarComponentStyles from '../ComprarComponentStyles';

store.dispatch(fetchProducts());

const AvaliableProductsContainer = {
  props: {
    buy: {
      commandNumber: '',
      sweetQuantity: '',
      whatToBuy: 'doce',
      drink: '',
      drinkQuantity: '',
      selectedDrink: '',
      loading: false,
    },
    products: {},
  },
  actions: {
    changeState: ({ key, value }) => console.log(key, value),
  },
  render: ({ props, actions }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <div class="container text-center">
    <div class="row">
      ${
        Object.keys(props.products.products).map(product => html`
          <div class="col-sm">
            ${RadioComponent({ radioLabel: product, value: product, onChange: actions.changeState({ key: 'whatToBuy', value: product }), checked: props.buy.whatToBuy === product })}
          </div>
        `)
      }
    </div>
  </div>
`,
};

const mapDispatchToProps = {
  changeState: ({ key, value }) => () => store.dispatch(changeEntryState({ key, value })),
};

const avaliableProducts = connectComponent(store, mapDispatchToProps, AvaliableProductsContainer);

define('app-avaliable-products', avaliableProducts);
