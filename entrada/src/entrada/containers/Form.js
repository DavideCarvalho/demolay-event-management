import { html, define } from 'hybrids';
import { addBootstrapStyle } from '../../utils';
import { connectComponent } from '../../connect';
import { changeEntryState } from '../../actions/EntryActions';
import store from '../../store';

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value);
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
  }
};

const FormContainer = {
  state: {},
  props: {
    entry: {
      commandNumber: '',
      boughtOnEntry: false,
    },
  },
  actions: {
    changeState: ({ key, value }) => console.log(key, value),
  },
  render: ({ props, actions }) => html`
    ${addBootstrapStyle}
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${(host, e) => actions.changeState({ key: 'commandNumber', value: e.target.value })} value=${props.entry.commandNumber} type="text" class="form-control commandNumber" placeholder="Número da comanda">
    <br />
    <div class="checkbox mb-3">
      <label>
        <input onclick=${(host, e) => actions.changeState({ key: 'boughtOnEntry', value: e.target.checked })} type="checkbox" id="boughtOnEntry" value=${props.entry.boughtOnEntry}> Comprado na entrada
      </label>
    </div>
  `,
};

const mapStateToProps = {
  entry: 'entry',
};

const mapDispatchToProps = {
  changeState: ({ key, value }) => store.dispatch(changeEntryState({ key, value })),
};

const form = connectComponent(store, mapStateToProps, mapDispatchToProps, FormContainer);
define('app-entrada-form', form);
