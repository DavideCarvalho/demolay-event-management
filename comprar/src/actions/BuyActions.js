import database from '../firebase';

export const CHANGE_STATE = 'CHANGE_STATE';
export const LOADING = 'LOADING';

export const changeEntryState = ({ key, value }) => {
  return {
    type: CHANGE_STATE,
    payload: {
      key,
      value,
    },
  };
};

export const buyProducts = payload => async (dispatch) => {
  const personRef = await database.collection('/pessoas').doc(`${payload.commandNumber}`).get();
  if (!personRef.exists) {
    throw new Error('Pessoa não existe');
  }
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    await database.collection('/pessoas').doc(`${payload.commandNumber}`).collection('bag').add(payload)
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};
