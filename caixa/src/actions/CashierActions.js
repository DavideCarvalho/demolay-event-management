import database from '../firebase';
export const CHANGE_STATE = 'CHANGE_STATE';
export const COMMAND_FOUND = 'COMMAND_FOUND';
export const PRODUCTS_VALUE = 'PRODUCTS_VALUE';
export const SUM_TOTAL_VALUE = 'SUM_TOTAL_VALUE';

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
    });
    return Promise.resolve('');
  } catch (e) {
    return Promise.reject(e);
  }
}

export const sumTotal = () => async (dispatch, getState) => {
  const state = getState();
  const bag = state.cashier.bag;
  const productsValue = state.cashier.products;
  const boughtOnEntry = state.cashier.boughtOnEntry;
  let totalValue = Object.keys(bag).reduce((total, key) => {
    const productTotal = bag[key].quantity * productsValue[bag[key].item];
    return total + productTotal;
  }, 0);
  if (boughtOnEntry) totalValue += 30;
  const total = await database.ref(`/report/totalMoney`).once('value');
  database.ref(`/report/totalMoney`).set(Number(total.val()) + totalValue);
  dispatch({
    type: SUM_TOTAL_VALUE,
    payload: totalValue
  });
}


export const getProductsValue = () => async dispatch => {
  try {
    const products = await database.ref(`/products`).once('value');
    console.log(products.val());
    dispatch({
      type: PRODUCTS_VALUE,
      payload: products.val()
    })
  } catch (e) {

  }
}