import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './css/bootstrap.js';
import entradaStyles from './EntradaComponentStyles';
import { changeEntryState, addNewPerson, changePersonList } from '../actions/EntryActions';
import store from '../store';
import connect from '../connect';
import database from '../firebase';

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value)
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
    return;
  };
}

const changeState = (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: target.value }));
}

const enterNewPerson = (commandNumber, boughtOnEntry) => async (host, e) => {
  e.preventDefault();
  try {
    await store.dispatch(addNewPerson({commandNumber, boughtOnEntry}));
    iziToast.success({
      title: 'Adicionado!',
      message: `Comanda ${commandNumber} adicionada com sucesso!`,
      color: 'green'
    });
  } catch (e) {
    if (e.message === 'already exists') {
      iziToast.info({
        title: 'Já Existe',
        message: `Já existe uma comanda com o número ${commandNumber}`,
        color: 'yellow'
      });
      return;
    }
    iziToast.error({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor tente novamente'
    });
  }
}

const bougthOnEntry = (boughtOnEntry) => (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: boughtOnEntry }));
}

database.ref('/pessoas').on('value', person => {
  store.dispatch(changePersonList(person.val()));
});


const EntradaComponent = {
  _commandNumber: '',
  _boughtOnEntry: false,
  _loading: false,
  render: ( { _commandNumber, _boughtOnEntry, _loading } ) => html`
  <style>
    ${styles}
    ${entradaStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${enterNewPerson(_commandNumber, _boughtOnEntry)}>
    <h1 class="h3 mb-3 font-weight-normal">Entrada</h1>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${changeState} value=${_commandNumber} id="commandNumber" type="text" class="form-control" placeholder="Número da comanda">
    <br />
    <div class="checkbox mb-3">
      <label>
        <input onchange=${bougthOnEntry(!_boughtOnEntry)} type="checkbox" id="boughtOnEntry" value=${_boughtOnEntry}> Comprou na entrada
      </label>
    </div>
    <button disabled=${_loading} class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
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
  connect(store, ({ entry }) => entry.boughtOnEntry),
  connect(store, ({ entry }) => entry.loading)
)

define('app-entrada', EntradaComponent);