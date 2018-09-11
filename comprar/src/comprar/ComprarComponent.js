import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './css/bootstrap.js';
import ComprarComponentStyles from './ComprarComponentStyles';
import DocesComponent from './doces/DocesComponent';
import { changeEntryState } from '../actions/BuyActions';
import store from '../store';
import connect from '../connect';

const changeState = (host, { target }) => {
  store.dispatch(changeEntryState({ key: target.id, value: target.value }));
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

const buyStuff = ({commandNumber, whatToBuy, sweetQuantity, drink, drinkQuantity}) => async (host, e) => {
  const payload = {
    commandNumber,
    buying: whatToBuy,
    item: whatToBuy === 'sweet' ? 'doce' : drink,
    quantity: sweetQuantity ? sweetQuantity : drinkQuantity
  }
  try {
    const response = await store.dispatch(buyStuff(payload));
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

let sweetChecked = true;
let drinksChecked = false;

const SWEET = 'sweet';
const DRINKS = 'drinks';

const ComprarComponent = {
  commandNumber: '',
  whatToBuy: 'sweet',
  sweetQuantity: 0,
  drink: '',
  drinkQuantity: 0,
  render: ({ commandNumber, whatToBuy, sweetQuantity, drink, drinkQuantity }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center" onSubmit=${buyStuff({commandNumber, whatToBuy, sweetQuantity, drink, drinkQuantity})}>
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
    <input oninput=${changeState} value=${commandNumber} id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
    <br/>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    ${
      whatToBuy === 'sweet' ?
      DocesComponent(sweetQuantity, changeState) :
      '<h1>Drinks</h1>'
    }
    <br />
    <button class="btn btn-lg btn-primary btn-block" type="submit">Comprar</button>
  </form>
  `
}

const connectedComprarComponent = (
  connectedCommandNumber,
  connectedWhatToBuy,
  connectedSweetQuantity,
  connectedDrnk,
  connectedDrinkQuantity,
) => {
  ComprarComponent.commandNumber = connectedCommandNumber;
  ComprarComponent.whatToBuy = connectedWhatToBuy;
  ComprarComponent.sweetQuantity = connectedSweetQuantity;
  ComprarComponent.drink = connectedDrnk;
  ComprarComponent.drinkQuantity = connectedDrinkQuantity;
  return ComprarComponent
}

const comprar = connectedComprarComponent(
  connect(store, ({ buy }) => buy.commandNumber),
  connect(store, ({ buy }) => buy.whatToBuy),
  connect(store, ({ buy }) => buy.sweetQuantity),
  connect(store, ({ buy }) => buy.drink),
  connect(store, ({ buy }) => buy.drinkQuantity),
)


define('app-comprar', comprar);