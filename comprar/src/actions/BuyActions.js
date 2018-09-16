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
  if (rest.buying === 'drink' && rest.item === "") {
    throw new Error("selecione uma bebida")
  }
  const personRef = await database.ref(`/pessoas/${commandNumber}`).once('value');
  console.log(personRef.val());
  if (!personRef.val()) {
    throw new Error('não existe');
  }
  const itemQuantity = await database.ref(`/report/${rest.item}`).once('value');
  dispatch({
    type: LOADING,
    payload: true
  });
  try {
    let bagRef = await database.ref(`/pessoas/${commandNumber}/bag`).once('value');
    let bag = bagRef.val();
    if (bag) {
      if (bag[rest.item]){
        const itemAlreadyBought = bag[rest.item];
        itemAlreadyBought.quantity = Number(itemAlreadyBought.quantity) + Number(rest.quantity);
        database.ref(`/pessoas/${commandNumber}/bag/${rest.item}`).set(itemAlreadyBought);
      }
      if(!bag[rest.item]) {
        database.ref(`/pessoas/${commandNumber}/bag/${rest.item}`).set({quantity: Number(rest.quantity)}); 
      }
    }
    database.ref(`/report/${rest.item}`).set(Number(itemQuantity.val()) + Number(rest.quantity));
    if(!bag) {
      database.ref(`/pessoas/${commandNumber}/bag/${rest.item}`).set({quantity: Number(rest.quantity)});
    }
    Promise.resolve('');
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