import { CHANGE_STATE } from '../actions/BuyActions';

const INITIAL_STATE = {
  commandNumber: '',
  sweetQuantity: '',
  whatToBuy: 'sweet',
  drink: '',
  drinkQuantity: '',
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_STATE:
      return {...state, [payload.key]: payload.value};
    default: 
      return state;
  }
}