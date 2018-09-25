import { html, define } from 'hybrids';
import { addBootstrapStyle, showMessage } from '../utils';
import { connectComponent } from '../connect';
import ComprarComponentStyles from './ComprarComponentStyles';
import RadioComponent from './components/RadioComponent';
import DocesComponent from './doces/DocesComponent';
import BebidasComponent from './bebidas/BebidasComponent';
import { changeEntryState } from '../actions/BuyActions';
import store from '../store';

const DOCE = 'doce';
const BEBIDA = 'bebida';
let sweetChecked = true;
let drinksChecked = false;


const buyStuff = ({
  commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink
}) => async (host, e) => {
  e.preventDefault();
  if (whatToBuy === 'doces' && !sweetQuantity) {
    if (sweetQuantity === '') showMessage({ title: 'Erro', message: 'Por favor, coloque a quantidade de doces desejada', color: 'red' });
    if (sweetQuantity === 0) showMessage({ title: 'Erro', message: 'A quantidade de doces deve ser maior que 0', color: 'red' });
    return;
  }
  if (whatToBuy === 'bebidas' && !drinkQuantity) {
    if (drinkQuantity === '') showMessage({ title: 'Erro', message: 'Por favor, coloque a quantidade de bebidas desejada', color: 'red' });
    if (drinkQuantity === 0) showMessage({ title: 'Erro', message: 'A quantidade de bebidas deve ser maior que 0', color: 'red' });
    return;
  }
  let payload = {
    commandNumber,
    buying: whatToBuy,
    item: whatToBuy === 'sweet' ? 'doce' : selectedDrink,
    quantity: whatToBuy === 'sweet' ? sweetQuantity : drinkQuantity,
  };
  if (selectedDrink) {
    payload = { ...payload, selectedDrink };
  }
  try {
    // const response = await store.dispatch(buyProducts(payload));
    showMessage({
      title: 'Sucesso',
      message: `Compra efetuada com sucesso na comanda ${commandNumber}`,
      color: 'green',
    });
  } catch (e) {
    if (e.message === 'não existe') {
      showMessage({
        title: 'Não existe',
        message: `A comanda ${commandNumber} não existe`,
        color: 'red',
      });
      return;
    }
    if (e.message === 'selecione uma bebida') {
      showMessage({
        title: 'Selecione uma bebida',
        message: 'Por favor, selecione uma bebida',
        color: 'red',
      });
      return;
    }
    showMessage({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor, tente novamente',
      color: 'red',
    });
  }
};

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value);
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
  }
};

const changeState = (host, e) => {
  store.dispatch(changeEntryState({ key: e.target.id, value: e.target.value }));
};

const changeRadioState = ({ key, value }) => (host, e) => {
  store.dispatch(changeEntryState({ key, value }));
  if (value === 'sweet') {
    sweetChecked = true;
    drinksChecked = false;
  } else {
    sweetChecked = false;
    drinksChecked = true;
  }
};


const EntradaComponent = {
  state: {},
  props: {
    buy: {
      commandNumber: '',
      sweetQuantity: '',
      whatToBuy: 'doce',
      drink: '',
      drinkQuantity: '',
      selectedDrink: '',
      loading: false,
    },
  },
  actions: {
    buy: ({
      commandNumber,
      whatToBuy,
      sweetQuantity,
      drinkQuantity,
      selectedDrink,
    }) => console.log(commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink),
  },
  render: ({ props, actions }) => html`
  ${addBootstrapStyle}
  <style>
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${actions.buy({commandNumber: props.buy.commandNumber, whatToBuy: props.buy.whatToBuy, sweetQuantity: props.buy.sweetQuantity, drinkQuantity: props.buy.drinkQuantity, selectedDrink: props.buy.selectedDrink })}>
    <h1 class="h3 mb-3 font-weight-normal">Comprar</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          ${RadioComponent({ radioLabel: 'Doce', value: DOCE, onChange: actions.changeRadio({ key: 'whatToBuy', value: DOCE }), checked: props.buy.whatToBuy === DOCE })}
        </div>
        <div class="col-sm">
          ${RadioComponent({ radioLabel: 'Bebida', value: BEBIDA, onChange: actions.changeRadio({ key: 'whatToBuy', value: BEBIDA }), checked: props.buy.whatToBuy === BEBIDA })}
        </div>
      </div>
    </div>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${changeState} value=${props.buy.commandNumber} id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
    <br/>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    ${
      props.buy.whatToBuy === 'doce'
        ? DocesComponent(props.buy.sweetQuantity, changeState, props.buy.onlyNumbers)
        : BebidasComponent(props.buy.drinkQuantity, changeState, props.buy.selectedDrink, onlyNumbers)
    }
    <br />
    <button class="btn btn-lg btn-primary btn-block" type="submit" disabled=${props.buy.loading}>Comprar</button>
  </form>
  `,
};

const mapDispatchToProps = {
  buy: ({ commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink }) => buyStuff({ commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink }),
  changeRadio: ({ key, value }) => changeRadioState({ key, value }),
};


const entrada = connectComponent(store, mapDispatchToProps, EntradaComponent);
define('app-entrada', entrada);
