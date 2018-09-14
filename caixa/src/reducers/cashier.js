import { CHANGE_STATE, COMMAND_FOUND, PRODUCTS_VALUE, SUM_TOTAL_VALUE } from '../actions/CashierActions';

const INITIAL_STATE = {
  commandNumber: '',
  bag: {},
  boughtOnEntry: false,
  products: {},
  totalValue: 0
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case CHANGE_STATE:
      return {...state, [payload.key]: payload.value};
    case COMMAND_FOUND:
      return {...state, boughtOnEntry: payload.boughtOnEntry, bag: payload.bag};
    case PRODUCTS_VALUE:
      return {...state, products: payload};
    case SUM_TOTAL_VALUE:
      return {...state, totalValue: payload}
    default:
      return state;
  }
}