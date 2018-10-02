import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './css/bootstrap';
import ComprarComponentStyles from './ComprarComponentStyles';
import { changeEntryState, buyProducts } from '../actions/BuyActions';
import { onlyNumbers } from '../utils';
import store from '../store';
import { connectComponent } from '../connect';
import './containers/AvaliableProductsContainer';
import './containers/ProductSelectionContainer';

const DOCE = 'doce';
const BEBIDA = 'bebida';

const changeState = (host, e) => {
  store.dispatch(changeEntryState({ key: e.target.id, value: e.target.value }));
};

const showToast = ({ title, message, color }) => {
  iziToast.show({
    title,
    message,
    color,
  });
};

const buyStuff = ({ buy, cart }) => async (host, e) => {
  e.preventDefault();
  const {
    whatToBuy,
    sweetQuantity,
    drinkQuantity,
    selectedDrink,
    commandNumber,
  } = buy;
  console.log(buy);
  console.log(cart);
  const numberSweetQuantity = Number(sweetQuantity.trim());
  if (whatToBuy === DOCE && !numberSweetQuantity) {
    showToast({ title: 'Erro', message: 'A quantidade de doces deve ser maior que 0', color: 'red' });
    return;
  }
  const numberDrinkQuantity = Number(drinkQuantity.trim());
  if (whatToBuy === BEBIDA && !selectedDrink) {
    showToast({ title: 'Erro', message: 'Selecione uma bebida para colocar a quantidade', color: 'red' });
    return;
  }
  if (whatToBuy === BEBIDA && !numberDrinkQuantity) {
    showToast({ title: 'Erro', message: 'A quantidade de bebidas deve ser maior que 0', color: 'red' });
    return;
  }
  const payload = {
    commandNumber,
    comprado: whatToBuy,
    item: whatToBuy === DOCE ? DOCE : selectedDrink,
    quantidade: whatToBuy === DOCE ? sweetQuantity : drinkQuantity,
    data: new Date(),
  };
  try {
    await store.dispatch(buyProducts(payload));
    iziToast.success({
      title: 'Sucesso',
      message: `Compra efetuada com sucesso na comanda ${commandNumber}`,
      color: 'green',
    });
  } catch (error) {
    if (error.message === 'não existe') {
      iziToast.show({
        title: 'Pessoa não existe',
        message: `A comanda ${commandNumber} não existe`,
        color: 'red',
      });
      return;
    }
    iziToast.error({
      title: 'Erro',
      message: 'Um erro inesperado aconteceu, por favor, tente novamente',
      color: 'red',
    });
  }
};

const ComprarComponent = {
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
    cart: {
      cart: {},
      intendedProduct: {
        productCategory: '',
        productName: '',
        productValue: '',
      },
    },
  },
  render: ({ props: { buy, cart }, actions }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${actions.buyStuff({ buy, cart })}>
    <h1 class="h3 mb-3 font-weight-normal">${JSON.stringify(cart)}</h1>
    <app-avaliable-products></app-avaliable-products>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <input onkeypress=${onlyNumbers} oninput=${changeState} value=${buy.commandNumber} id="commandNumber" type="text" id="inputEmail" class="form-control" placeholder="Número da comanda">
    <br/>
    <label for="inputEmail" class="sr-only">Número da comanda</label>
    <app-product-selection></app-product-selection>
    <br />
    <button class="btn btn-lg btn-primary btn-block" type="submit" disabled=${buy.loading}>Comprar</button>
  </form>
  `,
};

const mapDispatchToProps = {
  buyStuff: ({ buy, cart }) => buyStuff({ buy, cart }),
};

const comprar = connectComponent(store, mapDispatchToProps, ComprarComponent);

define('app-comprar', comprar);
