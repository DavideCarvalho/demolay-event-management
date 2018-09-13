import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './css/bootstrap.js';
import ComprarComponentStyles from './ComprarComponentStyles';
import DocesComponent from './doces/DocesComponent';
import BebidasComponent from './bebidas/BebidasComponent';
import { changeEntryState, buyProducts } from '../actions/BuyActions';
import store from '../store';
import connect from '../connect';

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value)
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
    return;
  };
}

const changeState = (host, e) => {
  store.dispatch(changeEntryState({ key: e.target.id, value: e.target.value }));
}

const changeRadio = (key, value) => (host, e) => {  
  store.dispatch(changeEntryState({ key, value }))
  if (value === 'sweet') {
    sweetChecked = true;
    drinksChecked = false;
  } else {
    sweetChecked = false;
    drinksChecked = true;
  }
}

const buyStuff = ({commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink}) => async (host, e) => {
  e.preventDefault();
  if (whatToBuy === 'sweet' && !sweetQuantity) {
    if (sweetQuantity === '') showToast({title: 'Erro', message: 'Por favor, coloque a quantidade de doces desejada', color: 'red'});
    if (sweetQuantity === 0) showToast({title: 'Erro', message: 'A quantidade de doces deve ser maior que 0', color: 'red'});
    return;
  }
  if (whatToBuy === 'drinks' && !drinkQuantity) {
    if (drinkQuantity === '') showToast({title: 'Erro', message: 'Por favor, coloque a quantidade de bebidas desejada', color: 'red'});
    if (drinkQuantity === 0) showToast({title: 'Erro', message: 'A quantidade de bebidas deve ser maior que 0', color: 'red'});
    return;
  }
  let payload = {
    commandNumber,
    buying: whatToBuy,
    item: whatToBuy === 'sweet' ? 'doce' : selectedDrink,
    quantity: whatToBuy === 'sweet' ? sweetQuantity : drinkQuantity
  }
  if (selectedDrink)
    payload = {...payload, selectedDrink};
  try {
    const response = await store.dispatch(buyProducts(payload));

    iziToast.success({
      title: 'Sucesso',
      message: 'Compra efetuada com sucesso',
      color: 'green'
    });
  } catch (e) {
    iziToast.error({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor, tente novamente',
      color: 'red'
    });
  }
}

const showToast = ({title, message, color}) => {
  iziToast.show({
    title,
    message,
    color
  });
}

let sweetChecked = true;
let drinksChecked = false;

const SWEET = 'sweet';
const DRINKS = 'drinks';

const ComprarComponent = {
  commandNumber: '',
  whatToBuy: 'sweet',
  sweetQuantity: 0,
  drinkQuantity: 0,
  selectedDrink: '',
  loading: false,
  render: ({ commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink, loading }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${buyStuff({commandNumber, whatToBuy, sweetQuantity, drinkQuantity, selectedDrink})}>
    <h1 class="h3 mb-3 font-weight-normal">Comprar</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="buySweet" name="customRadioInline1" class="custom-control-input" value=${SWEET} onchange=${changeRadio('whatToBuy', SWEET)} checked=${whatToBuy === SWEET}>
            <label class="custom-control-label" for="buySweet">Doces</label>
          </div>
        </div>
        <div class="col-sm">
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="buyDrink" name="customRadioInline1" class="custom-control-input" value=${DRINKS} onchange=${changeRadio('whatToBuy', DRINKS)} checked=${whatToBuy === DRINKS}>
            <label class="custom-control-label" for="buyDrink">Bebidas</label>
          </div>
        </div>
      </div>
    </div>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${changeState} value=${commandNumber} id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
    <br/>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    ${
      whatToBuy === 'sweet' ?
      DocesComponent(sweetQuantity, changeState, onlyNumbers) :
      BebidasComponent(drinkQuantity, changeState, selectedDrink, onlyNumbers)
    }
    <br />
    <button class="btn btn-lg btn-primary btn-block" type="submit" disabled=${loading}>Comprar</button>
  </form>
  `
}

const connectedComprarComponent = (
  connectedCommandNumber,
  connectedWhatToBuy,
  connectedSweetQuantity,
  connectedDrinkQuantity,
  connectedSelectedDrink,
  connectedLoading
) => {
  ComprarComponent.commandNumber = connectedCommandNumber;
  ComprarComponent.whatToBuy = connectedWhatToBuy;
  ComprarComponent.sweetQuantity = connectedSweetQuantity;
  ComprarComponent.drinkQuantity = connectedDrinkQuantity;
  ComprarComponent.selectedDrink = connectedSelectedDrink;
  ComprarComponent.loading = connectedLoading
  return ComprarComponent
}

const comprar = connectedComprarComponent(
  connect(store, ({ buy }) => buy.commandNumber),
  connect(store, ({ buy }) => buy.whatToBuy),
  connect(store, ({ buy }) => buy.sweetQuantity),
  connect(store, ({ buy }) => buy.drinkQuantity),
  connect(store, ({ buy }) => buy.selectedDrink),
  connect(store, ({ buy }) => buy.loading),
)


define('app-comprar', comprar);