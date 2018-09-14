import { html, define } from 'hybrids';
import { changeState, findCommand, getProductsValue, sumTotal } from '../actions/CashierActions';
import BagListComponent from './BagListComponent/BagListComponent';
import connect from '../connect';
import store from '../store';
import styles from './css/bootstrap.js';

store.dispatch(getProductsValue());

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value)
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
    return;
  };
}

const changeInputState = (host, { target }) => {
  store.dispatch(changeState({ key: target.id, value: target.value }));
}

const buttonClickHandler = (commandNumber, bag, products) => async () => {
  try {
    await store.dispatch(findCommand(commandNumber));
    store.dispatch(sumTotal(bag, products));
  } catch (e) {
    if (e.message === 'commandNumber not found') {
      console.log('não existe')
    }
  }
}

const addToTotal = (itemValue) => {
  store.dispatch(sumTotalValue(itemValue));
}

const CaixaComponent = {
  _commandNumber: '',
  _boughtOnEntry: false,
  _bag: {},
  _products: {},
  _totalValue: 0,
  render: ({ _commandNumber, _boughtOnEntry, _bag, _products, _totalValue }) => html`
    <style>
      ${styles}
    </style>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center">Caixa</h1>
          <div class="input-group">
            <input onkeypress=${onlyNumbers} oninput=${changeInputState} value=${_commandNumber} id="commandNumber" type="text" class="form-control" placeholder="Número da comanda">
            <button type="button" onclick=${buttonClickHandler(_commandNumber)} class="btn btn-primary">Procurar</button>
          </div>
          <br/>
          ${
            Object.keys(_bag).length ?
            BagListComponent(_bag, _products, _boughtOnEntry) :
            ''
          }
          ${
            _totalValue ?
              html`<p class="text-center"> Valor total - ${_totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})}</p>` :
              ''
          }
          <button type="button" onclick=${buttonClickHandler(_commandNumber)} class="btn btn-primary">Pagar</button>
        </div>
      </div>
    </div>
  `
}

const connectedCaixaComponent = (
  connectedCommandNumber,
  connectedBoughtOnEntry,
  connectedBag,
  connectedProducts,
  connectedTotalValue
) => {
  CaixaComponent._commandNumber = connectedCommandNumber;
  CaixaComponent._boughtOnEntry = connectedBoughtOnEntry;
  CaixaComponent._bag = connectedBag;
  CaixaComponent._products = connectedProducts;
  CaixaComponent._totalValue = connectedTotalValue;
  return CaixaComponent;
}

const caixa = connectedCaixaComponent(
  connect(store, ({ cashier }) => cashier.commandNumber),
  connect(store, ({ cashier }) => cashier.boughtOnEntry),
  connect(store, ({ cashier }) => cashier.bag),
  connect(store, ({ cashier }) => cashier.products),
  connect(store, ({ cashier }) => cashier.totalValue)
);

define('app-caixa', caixa);