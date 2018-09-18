import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import entradaStyles from './EntradaStyles.js';
import { addBootstrapStyle } from '../utils';
import { changeEntryState, addNewPerson, changePersonList } from '../actions/EntryActions.js';
import store from '../store.js';
import connect from '../connect.js';
import database from '../firebase.js';

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
    showMessage({
      title: 'Adicionado!',
      message: `Comanda ${commandNumber} adicionada com sucesso!`,
      color: 'green'
    });
  } catch (e) {
    if (e.message === 'already exists') {
      showMessage({
        title: 'Já Existe',
        message: `Já existe uma comanda com o número ${commandNumber}`,
        color: 'yellow'
      });
      return;
    }
    showMessage({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor tente novamente'
    });
  }
}

const showMessage = ({ title, message, color }) => {
  iziToast.show({
    title,
    message,
    color
  });
}

const bougthOnEntry = (boughtOnEntry) => (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: boughtOnEntry }));
}


const EntradaComponent = {
  state: {
  },
  props: {
    entry: {
      commandNumber: '',
      boughtOnEntry: false,
      loading: false
    }
  },
  render: ( { state, props } ) => html`
  ${addBootstrapStyle}
  <style>
    ${entradaStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${enterNewPerson(props.entry.commandNumber, props.entry.boughtOnEntry)}>
    <h1 class="h3 mb-3 font-weight-normal">Entrada</h1>
    <app-entrada-form></app-entrada-form>
    <button disabled=${props.entry.loading} class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
  </form>
  `
}

const connectComponent = (reduxStore, reduxStoreDictionary, component) => {
  const store = reduxStore.getState();
  Object.keys(store).forEach(reduxStoreName => {
    const componentProperty = reduxStoreDictionary[reduxStoreName];
    component.props[componentProperty] = store[reduxStoreName];
  });
  return component;
}

const mapStateToProps = {
  entry: 'entry'
};

const entrada = connectComponent(store, mapStateToProps, EntradaComponent);

define('app-entrada', entrada);