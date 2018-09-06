export const CHANGE_ENTRY_STATE = 'CHANGE_ENTRY_STATE';
export const ADD_NEW_PERSON = 'ADD_NEW_PERSON';
import axios from 'axios';

export const changeEntryState = ({key, value}) => {
  return {
    type: CHANGE_ENTRY_STATE,
    payload: {
      key,
      value
    }
  }
}

export const addNewPerson = ({commandNumber, boughtOnEntry}) =>
  async (dispatch) => {
    const response = await axios.post('teste', {commandNumber, boughtOnEntry})
    dispatch({
      type: ADD_NEW_PERSON,
      payload: {
        response
      }
    });
  }