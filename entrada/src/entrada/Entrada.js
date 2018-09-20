import { html, define } from 'hybrids';
import entradaStyles from './EntradaStyles';
import { addBootstrapStyle, showMessage } from '../utils';
import { addNewPerson } from '../actions/EntryActions';
import store from '../store';
import { connectComponent } from '../connect';

const enterNewPerson = (commandNumber, boughtOnEntry) => async (host, event) => {
  event.preventDefault();
  try {
    await store.dispatch(addNewPerson({ commandNumber, boughtOnEntry }));
    showMessage({
      title: 'Adicionado!',
      message: `Comanda ${commandNumber} adicionada com sucesso!`,
      color: 'green',
    });
  } catch (e) {
    if (e.message === 'already exists') {
      showMessage({
        title: 'Já Existe',
        message: `Já existe uma comanda com o número ${commandNumber}`,
        color: 'yellow',
      });
      return;
    }
    showMessage({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor tente novamente',
    });
  }
};

const EntradaComponent = {
  state: {
  },
  props: {
    entry: {
      commandNumber: '',
      boughtOnEntry: false,
      loading: false,
    },
  },
  render: ({ props }) => html`
  ${addBootstrapStyle}
  <style>
    ${entradaStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${enterNewPerson(props.entry.commandNumber, props.entry.boughtOnEntry)}>
    <h1 class="h3 mb-3 font-weight-normal">Entrada</h1>
    <app-entrada-form></app-entrada-form>
    <button disabled=${props.entry.loading} class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
  </form>
  `,
};

const mapStateToProps = {
  entry: 'entry',
};

const entrada = connectComponent(store, mapStateToProps, {}, EntradaComponent);
define('app-entrada', entrada);
