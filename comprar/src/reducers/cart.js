import { CHANGE_INTENDED_PRODUCT_CATEGORY } from '../actions/CartActions';

const INITIAL_STATE = {
  cart: {},
  intendedProduct: {
    productCategory: '',
    productName: '',
    productValue: '',
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_INTENDED_PRODUCT_CATEGORY:
      return {
        ...state,
        intendedProduct: {
          ...state.intendedProduct,
          productCategory: payload,
        },
      };
    default:
      return state;
  }
};
