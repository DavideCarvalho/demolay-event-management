import { html, define } from 'hybrids';
import store from '../../store';
import { connectComponent } from '../../connect';
import { fetchProducts } from '../../actions/ProductsActions';

store.dispatch(fetchProducts());

const AvaliableProductsContainer = {
  props: {
    products: {},
  },
  action: {},
  render: ({ props, actions }) => html`
  <div class="container">
    <div class="row">
      
    </div>
  </div>
`,
};

const avaliableProducts = connectComponent(store, {}, AvaliableProductsContainer);

define('app-avaliable-products', avaliableProducts);
