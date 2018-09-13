import database from '../firebase';
export const CHANGE_STATE = 'CHANGE_STATE';
export const COMMAND_FOUND = 'COMMAND_FOUND';

export const changeState = ({key, value}) => dispatch => {
  dispatch({
    type: CHANGE_STATE,
    payload: { 
      key,
      value
    }
  });
}

export const findCommand = commandNumber => async dispatch => {
  try {
    const person = await database.ref(`/pessoas/${commandNumber}`).once('value');
    if (!person.val()) {
      throw new Error('commandNumber not found')
    }
    dispatch({
      type: COMMAND_FOUND,
      payload: person.val()
    })
    return Promise.resolve('');
  } catch (e) {
    return Promise.reject(e);
  }
}