import { CHANGE_ENTRY_STATE } from '../actions/EntryActions';

const INITIAL_STATE = {
  commandNumber: '',
  boughtOnEntry: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CHANGE_ENTRY_STATE:
      console.log(payload);
      return {...state, [payload.key]: payload.value}
    default: 
      return state;
  }
}