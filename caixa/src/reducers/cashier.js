import { CHANGE_STATE, COMMAND_FOUND, PRODUCTS_VALUE, SUM_TOTAL_VALUE, PAID, CHANGE_BAG_EDIT_STATE } from '../actions/CashierActions';

const INITIAL_STATE = {
  commandNumber: '',
  bag: {},
  editBag: {},
  paid: false,
  boughtOnEntry: false,
  editBoughtOnEntry: false,
  products: {},
  totalValue: null,
  debito: false,
  credito: false,
  dinheiro: false,
  edit: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case CHANGE_STATE:
      return {...state, [payload.key]: payload.value};
    case CHANGE_BAG_EDIT_STATE:
      return {...state, editBag: {
          ...state.editBag, [payload.key]: {
            ...state.editBag[payload.key], quantity: payload.value
          }
        }
      };
    case COMMAND_FOUND:
      return {...state, boughtOnEntry: payload.boughtOnEntry, editBoughtOnEntry: payload.boughtOnEntry, bag: payload.bag, editBag: payload.bag, paid: payload.paid};
    case PRODUCTS_VALUE:
      return {...state, products: payload};
    case SUM_TOTAL_VALUE:
      return {...state, totalValue: payload}
    case PAID:
      return {...state, paid: payload}
    default:
      return state;
  }
}