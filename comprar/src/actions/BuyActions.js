import database from '../firebase';

export const CHANGE_STATE = 'CHANGE_STATE'
export const LOADING = 'LOADING';

export const changeEntryState = ({key, value}) => {
  return {
    type: CHANGE_STATE,
    payload: {
      key,
      value
    }
  }
}

export const buyProducts = (payload) => async dispatch => {
  const {commandNumber, ...rest} = payload;
  const itemQuantity = await database.ref(`/report/${rest.item}`).once('value');
  dispatch({
    type: LOADING,
    payload: true
  });
  try {
    const response = await database.ref(`/pessoas/${commandNumber}/bag`).push(rest)
    database.ref(`/report/${rest.item}`).set(Number(itemQuantity.val()) + Number(rest.quantity));
    Promise.resolve(response);
  }
  catch (e) {
    Promise.reject(e);
  } finally {
    dispatch({
      type: LOADING,
      payload: false
    });
  }
}