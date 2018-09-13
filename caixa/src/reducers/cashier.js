import { CHANGE_STATE, COMMAND_FOUND } from '../actions/CashierActions';

const INITIAL_STATE = {
  commandNumber: '',
  bag: {},
  boughtOnEntry: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case CHANGE_STATE:
      return {...state, [payload.key]: payload.value};
    case COMMAND_FOUND:
      return {...state, boughtOnEntry: payload.boughtOnEntry, bag: payload.bag};
    default:
      return state;
  }
}