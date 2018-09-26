import { html, define } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './css/bootstrap';
import ComprarComponentStyles from './ComprarComponentStyles';
import DocesComponent from './doces/DocesComponent';
import BebidasComponent from './bebidas/BebidasComponent';
import RadioComponent from './components/RadioComponent';
import { changeEntryState, buyProducts } from '../actions/BuyActions';
import { onlyNumbers } from '../utils';
import store from '../store';
import { connectComponent } from '../connect';
import './containers/AvaliableProductsContainer';

const DOCE = 'doce';
const BEBIDA = 'bebida';

const changeState = (host, e) => {
  store.dispatch(changeEntryState({ key: e.target.id, value: e.target.value }));
};

const changeRadioState = ({ key, value }) => (host, event) => {
  store.dispatch(changeEntryState({ key, value }));
};

const showToast = ({title, message, color}) => {
  iziToast.show({
    title,
    message,
    color,
  });
};

const buyStuff = ({ buy: {
  commandNumber,
  whatToBuy,
  sweetQuantity,
  drinkQuantity,
  selectedDrink,
},
}) => async (host, e) => {
  e.preventDefault();
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
  },
  actions: {
    changeRadio: ({ key, value }) => console.log(key, value),
  },
  render: ({ props, actions }) => html`
  <style>
    ${styles}
    ${ComprarComponentStyles}
  </style>
  <form class="form-signin text-center" onsubmit=${buyStuff({ buy: props.buy })}>
    <h1 class="h3 mb-3 font-weight-normal">Comprar</h1>
    <app-avaliable-products></app-avaliable-products>
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
    ? DocesComponent({ sweetQuantity: props.buy.sweetQuantity, changeState })
    : BebidasComponent({ drinkQuantity: props.buy.drinkQuantity, changeState, selectedDrink: props.buy.selectedDrink })
}
    <br />
    <button class="btn btn-lg btn-primary btn-block" type="submit" disabled=${props.buy.loading}>Comprar</button>
  </form>
  `,
};

const mapDispatchToProps = {
  changeRadio: ({ key, value }) => changeRadioState({ key, value }),
};

const comprar = connectComponent(store, mapDispatchToProps, ComprarComponent);

define('app-comprar', comprar);
