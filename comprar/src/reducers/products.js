import { FETCH_PRODUCTS } from '../actions/ProductsActions';

const INITIAL_STATE = {
  products: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};
