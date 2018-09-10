import { html, define } from 'hybrids';
import styles from './css/bootstrap.js';
import ComprarComponentStyles from './ComprarComponentStyles';
import DocesComponent from './doces/DocesComponent';
import { changeEntryState } from '../actions/BuyActions';
import store from '../store';
import connect from '../connect';

const changeState = (host, { target }) => {
  console.log('to aqui');
  store.dispatch(changeEntryState({ key: target.id, value: target.value }))
}


const ComprarComponent = {
  whatToBuy: 'sweet',
  sweetQuantity: 0,
  drink: '',
  drinkQuantity: 0,
  render: ({ whatToBuy, sweetQuantity }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center">
    <h1 class="h3 mb-3 font-weight-normal">Comprar</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="sweet" checked>
            <label class="custom-control-label" for="customRadioInline1">Doces</label>
          </div>
        </div>
        <div class="col-sm">
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="drinks">
            <label class="custom-control-label" for="customRadioInline2">Bebidas</label>
          </div>
        </div>
      </div>
    </div>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
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
  connectedWhatToBuy,
  connectedSweetQuantity,
  connectedDrnk,
  connectedDrinkQuantity,
) => {
  ComprarComponent.whatToBuy = connectedWhatToBuy;
  ComprarComponent.sweetQuantity = connectedSweetQuantity;
  ComprarComponent.drink = connectedDrnk;
  ComprarComponent.drinkQuantity = connectedDrinkQuantity;
  return ComprarComponent
}

const comprar = connectedComprarComponent(
  connect(store, ({ buy }) => buy.whatToBuy),
  connect(store, ({ buy }) => buy.sweetQuantity),
  connect(store, ({ buy }) => buy.drink),
  connect(store, ({ buy }) => buy.drinkQuantity),
)


define('app-comprar', comprar);