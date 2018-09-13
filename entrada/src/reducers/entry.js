import { CHANGE_ENTRY_STATE, ADD_NEW_PERSON, CHANGE_PERSON_LIST, LOADING } from '../actions/EntryActions';

const INITIAL_STATE = {
  commandNumber: '',
  boughtOnEntry: false,
  people: {},
  loading: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {...state, loading: payload}
    case CHANGE_ENTRY_STATE:
      return {...state, [payload.key]: payload.value};
    case ADD_NEW_PERSON:
      return {...state, people: {
        ...state.people, [payload.commandNumber]: {
          boughtOnEntry: payload.boughtOnEntry
        }
      }};
    case CHANGE_PERSON_LIST:
        return {...state, people: payload};
    default: 
      return state;
  }
}