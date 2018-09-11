import database from '../firebase';

export const CHANGE_STATE = 'CHANGE_STATE';

export const changeEntryState = ({key, value}) => {
  return {
    type: CHANGE_STATE,
    payload: {
      key,
      value
    }
  }
}

export const buyStuff = (payload) => async dispatch => {
  const {commandNumber, ...rest} = payload;
  database.ref(`/pessoas/${commandNumber}`).set({rest})
}