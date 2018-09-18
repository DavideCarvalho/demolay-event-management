import { html, define } from 'hybrids';
import { addBootstrapStyle } from '../../utils';
import { connectComponent } from '../../connect';
import store from '../../store';

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

const bougthOnEntry = (boughtOnEntry) => (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: boughtOnEntry }));
}

const FormContainer = {
  state: {},
  props: {
    entry: {
      commandNumber: '',
      boughtOnEntry: false,
    }
  },
  render: ( { state, props } ) => html`
    ${addBootstrapStyle}
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${changeState} value=${props.entry.commandNumber} id="commandNumber" type="text" class="form-control" placeholder="Número da comanda">
    <br />
    <div class="checkbox mb-3">
      <label>
        <input onchange=${bougthOnEntry(!props.entry.boughtOnEntry)} type="checkbox" id="boughtOnEntry" value=${props.entry.boughtOnEntry}> Comprou na entrada
      </label>
    </div>
  `
}

const mapStateToProps = {
  entry: 'entry'
};

const form = connectComponent(store, mapStateToProps, FormContainer);
define('app-entrada-form', form);