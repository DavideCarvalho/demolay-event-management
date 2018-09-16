import database from '../firebase';
export const CHANGE_STATE = 'CHANGE_STATE';
export const CHANGE_BAG_EDIT_STATE = 'CHANGE_BAG_EDIT_STATE';
export const COMMAND_FOUND = 'COMMAND_FOUND';
export const PRODUCTS_VALUE = 'PRODUCTS_VALUE';
export const SUM_TOTAL_VALUE = 'SUM_TOTAL_VALUE';
export const PAID = 'PAID';

export const changeState = ({key, value}) => dispatch => {
  dispatch({
    type: CHANGE_STATE,
    payload: { 
      key,
      value
    }
  });
}

export const editBag = () => async (dispatch, getState) => {
  let state = getState();
  const commandNumber = state.cashier.commandNumber;
  const editBoughtOnEntry = state.cashier.editBoughtOnEntry;
  const oldBag = state.cashier.bag;
  const personRef = await database.ref(`/pessoas/${commandNumber}`).once('value');
  const person = personRef.val();
  const personTotalValue = person.total;
  const editBag = state.cashier.editBag;
  const productsValue = state.cashier.products;
  dispatch({
    type: CHANGE_STATE,
    payload: {
      key: 'bag',
      value: editBag
    }
  });
  dispatch({
    type: CHANGE_STATE,
    payload: {
      key: 'edit',
      value: false
    }
  });
  dispatch({
    type: CHANGE_STATE,
    payload: {
      key: 'boughtOnEntry',
      value: editBoughtOnEntry
    }
  });
  state = getState();
  const bag = state.cashier.bag;
  const boughtOnEntry = state.cashier.boughtOnEntry;
  let newTotalValue = 0;
  if (bag) {
    newTotalValue = Object.keys(bag).reduce((total, key) => {
      const productTotal = bag[key].quantity * productsValue[key];
      return total + productTotal;
    }, 0);
  }
  if (boughtOnEntry) newTotalValue += 30;
  const totalRef = await database.ref(`/report/totalMoney`).once('value');
  const total = totalRef.val();
  const newTotal = (Number(total) - Number(personTotalValue)) + Number(newTotalValue);
  person.total = newTotalValue;
  person.bag = bag || {};
  person.boughtOnEntry = boughtOnEntry;
  database.ref(`/pessoas/${commandNumber}`).set(person);
  database.ref(`/report/totalMoney`).set(newTotal);
  for(const key in oldBag) {
    if (Number(oldBag[key].quantity) !== Number(bag[key].quantity)) {
      const itemRef = await database.ref(`/report/${key}`).once('value');
      let itemValue = itemRef.val();
      itemValue -= Number(oldBag[key].quantity);
      itemValue += Number(bag[key].quantity);
      database.ref(`/report/${key}`).set(Number(itemValue));
    }
  }
  dispatch({
    type: CHANGE_STATE,
    payload: {
      key: 'totalValue',
      value: newTotalValue
    }
  });
}

export const changeBagEditState = ({key, value}) => dispatch => {
  dispatch({
    type: CHANGE_BAG_EDIT_STATE,
    payload: { 
      key,
      value
    }
  });
}

export const findCommand = commandNumber => async dispatch => {
  try {
    const personRef = await database.ref(`/pessoas/${commandNumber}`).once('value');
    if (!personRef.val()) {
      throw new Error('commandNumber not found')
    }
    let person = personRef.val();
    dispatch({
      type: COMMAND_FOUND,
      payload: person
    });
    return Promise.resolve('');
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

export const sumTotal = () => async (dispatch, getState) => {
  const state = getState();
  const bag = state.cashier.bag;
  const productsValue = state.cashier.products;
  const boughtOnEntry = state.cashier.boughtOnEntry;
  const commandNumber = state.cashier.commandNumber;
  let totalValue = 0;
  if (bag) {
    totalValue = Object.keys(bag).reduce((total, key) => {
      const productTotal = bag[key].quantity * productsValue[key];
      return total + productTotal;
    }, 0);
  }
  if (boughtOnEntry) totalValue += 30;
  const personRef = await database.ref(`/pessoas/${commandNumber}`).once('value');
  let person = personRef.val();
  if (!person.total) {
    person = {...person, total: totalValue};
    const totalRef = await database.ref(`/report/totalMoney`).once('value');
    database.ref(`/report/totalMoney`).set(Number(totalRef.val()) + totalValue);
    database.ref(`/pessoas/${commandNumber}`).set(person);
  }
  dispatch({
    type: SUM_TOTAL_VALUE,
    payload: totalValue
  });
}

export const pay = (commandNumber, total, credito, debito, dinheiro) => async dispatch => {
  if (!credito && !debito && !dinheiro) {
    throw new Error('escolha um método de pagamento');
  }
  const personRef = await database.ref(`/pessoas/${commandNumber}`).once('value');
  let person = personRef.val();
  person = {...person, paid: true};
  database.ref(`/pessoas/${commandNumber}`).set(person);
  const totalPaidRef = await database.ref(`/report/totalPaid`).once('value');
  database.ref(`/report/totalPaid`).set(Number(totalPaidRef.val()) + Number(total));
  if (credito) {
    const creditoRef = await database.ref(`/report/paymentMethods/credito`).once('value');
    database.ref(`/report/paymentMethods/credito`).set(Number(creditoRef.val()) + 1);
  }
  if (debito) {
    const debitoRef = await database.ref(`/report/paymentMethods/debito`).once('value');
    database.ref(`/report/paymentMethods/debito`).set(Number(debitoRef.val()) + 1);
  }
  if (dinheiro) {
    const dinheiroRef = await database.ref(`/report/paymentMethods/dinheiro`).once('value');
    database.ref(`/report/paymentMethods/dinheiro`).set(Number(dinheiroRef.val()) + 1);
  }
  dispatch({
    type: PAID,
    payload: true
  })
}

export const getProductsValue = () => async dispatch => {
  try {
    const products = await database.ref(`/products`).once('value');
    dispatch({
      type: PRODUCTS_VALUE,
      payload: products.val()
    })
  } catch (e) {

  }
}