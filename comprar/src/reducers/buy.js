import { CHANGE_STATE, LOADING } from '../actions/BuyActions';

const INITIAL_STATE = {
  commandNumber: '',
  sweetQuantity: '',
  whatToBuy: 'sweet',
  drink: '',
  drinkQuantity: '',
  selectedDrink: '',
  loading: false,
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_STATE:
      return {...state, [payload.key]: payload.value};
    case LOADING:
      return {...state, loading: payload}
    default: 
      return state;
  }
}