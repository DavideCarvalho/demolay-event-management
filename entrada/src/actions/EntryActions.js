export const CHANGE_ENTRY_STATE = 'CHANGE_ENTRY_STATE';
export const ADD_NEW_PERSON = 'ADD_NEW_PERSON';
export const CHANGE_PERSON_LIST = 'CHANGE_PERSON_LIST';
export const LOADING = 'LOADING';
import database from '../firebase';

export const changeEntryState = ({key, value}) => {
  return {
    type: CHANGE_ENTRY_STATE,
    payload: {
      key,
      value
    }
  }
}

export const changePersonList = personList => dispatch => {
  dispatch({
    type: CHANGE_PERSON_LIST,
    payload: personList
  });
}

export const addNewPerson = ({commandNumber, boughtOnEntry}) => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  try {
    const alreadyExists = await database.ref(`/pessoas/${commandNumber}`).once('value');
    if (alreadyExists.val()) {
      throw new Error('already exists');
    }
    const personQuantity = await database.ref(`/report/totalPeople`).once('value');
    let boughtOnEntryQuantity;
    if (boughtOnEntry) {
      boughtOnEntryQuantity = await database.ref(`/report/boughtOnEntry`).once('value');
    }
    await database.ref(`/pessoas/${commandNumber}`).set({
      boughtOnEntry,
      paid: false
    });
    database.ref(`/report/totalPeople`).set(Number(personQuantity.val()) + 1);
    database.ref(`/report/boughtOnEntry`).set(Number(boughtOnEntryQuantity.val()) + 1);
    dispatch({
      type: ADD_NEW_PERSON,
      payload: {
        commandNumber,
        boughtOnEntry,
        paid: false
      }
    })
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    dispatch({
      type: LOADING,
      payload: false
    })
  }
}