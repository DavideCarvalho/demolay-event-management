import { html, define } from 'hybrids';
import { navigateToUrl } from 'single-spa'
import { changeState, findCommand } from '../actions/CashierActions';
import BagListComponent from './BagListComponent/BagListComponent';
import connect from '../connect';
import store from '../store';
import styles from './css/bootstrap.js';

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

const buttonClickHandler = (commandNumber) => async (host, event) => {
  try {
    const response = await store.dispatch(findCommand(commandNumber));
  } catch (e) {
    if (e.message === 'commandNumber not found') {
      console.log('não existe')
    }
  }
}

const CaixaComponent = {
  _commandNumber: '',
  _boughtOnEntry: false,
  _bag: {},
  render: ({ _commandNumber, _boughtOnEntry, _bag }) => html`
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
            BagListComponent(_bag) :
            ''
          }
        </div>
      </div>
    </div>
  `
}

const connectedCaixaComponent = (
  connectedCommandNumber,
  connectedBoughtOnEntry,
  connectedBag,
) => {
  CaixaComponent._commandNumber = connectedCommandNumber;
  CaixaComponent._boughtOnEntry = connectedBoughtOnEntry;
  CaixaComponent._bag = connectedBag;
  return CaixaComponent;
}

const caixa = connectedCaixaComponent(
  connect(store, ({ cashier }) => cashier.commandNumber),
  connect(store, ({ cashier }) => cashier.boughtOnEntry),
  connect(store, ({ cashier }) => cashier.bag)
);

define('app-caixa', caixa);