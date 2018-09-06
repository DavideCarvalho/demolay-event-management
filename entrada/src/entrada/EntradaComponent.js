import { html, define } from 'hybrids'

import styles from './css/bootstrap.js';
import entradaStyles from './EntradaComponentStyles';
import { changeEntryState } from '../actions/EntryActions';
import store from '../store';
import connect from '../connect';

const changeState = (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: target.value }));
}

const enterNewPerson = (commandNumber, boughtOnEntry) => (host, e) => {
  e.preventDefault();
  console.log(commandNumber, boughtOnEntry);
}

const bougthOnEntry = (boughtOnEntry) => (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: boughtOnEntry }));
}


const EntradaComponent = {
  _commandNumber: '',
  _boughtOnEntry: false,
  render: ({_commandNumber, _boughtOnEntry}) => html`
  <style>
    ${styles}
    ${entradaStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${enterNewPerson(_commandNumber, _boughtOnEntry)}>
    <h1 class="h3 mb-3 font-weight-normal">Entrada</h1>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input oninput=${changeState} value=${_commandNumber} id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
    <br />
    <div class="checkbox mb-3">
      <label>
        <input onchange=${bougthOnEntry(!_boughtOnEntry)} type="checkbox" id="boughtOnEntry" value=${_boughtOnEntry}> Comprou na entrada
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
  </form>
  `
}

const createSimpleCounter = (connectedComandNumber, connectedBougthOnEntry) => {
  EntradaComponent._commandNumber = connectedComandNumber;
  EntradaComponent._boughtOnEntry = connectedBougthOnEntry;
  return EntradaComponent;
}
const entrada = createSimpleCounter(
  connect(store, ({ entry }) => entry.commandNumber),
  connect(store, ({ entry }) => entry.boughtOnEntry)
)

define('app-entrada', EntradaComponent);