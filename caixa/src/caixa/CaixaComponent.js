import { html, define } from 'hybrids';
import { changeState, findCommand, getProductsValue, sumTotal, pay, changeBagEditState, editBag } from '../actions/CashierActions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import FindCommandComponent from './FindCommandComponent/FindCommandComponent';
import BagListComponent from './BagListComponent/BagListComponent';
import PaymentMethodsComponent from './PaymentMethodsComponent/PaymentMethodsComponent';
import PayComponent from './PayComponent/PayComponent';
import connect from '../connect';
import store from '../store';
import styles from './css/bootstrap.js';

store.dispatch(getProductsValue());

const changeEditBoughtOnEntryHandler = (editBoughtOnEntry) => (host, e) => {
  store.dispatch(changeState({key: 'editBoughtOnEntry', value: !editBoughtOnEntry}))
}

const onlyNumbers = (host, e) => {
  const addedInput = String.fromCharCode(e.which);
  const currentValue = (e.target.value)
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    e.preventDefault();
    return;
  };
}

const changeBagHandler = (host, e) => {
  store.dispatch(editBag());
}

const changeEditState = (edit) => (host, e) => {
  store.dispatch(changeState({key: 'edit', value: !edit}));
}

const changeBagEditStateHandler = (host, { target }) => {
  store.dispatch(changeBagEditState({ key: target.id, value: target.value }));
}

const changeInputState = (host, { target }) => {
  store.dispatch(changeState({ key: target.id, value: target.value }));
}

const changeCheckboxState = (host, { target }) => {
  store.dispatch(changeState({ key: target.id, value: target.checked }));
}

const findCommandHandler = (commandNumber) => async () => {
  try {
    await store.dispatch(findCommand(commandNumber));
    store.dispatch(sumTotal());
  } catch (e) {
    if (e.message === 'commandNumber not found') {
      iziToast.show({
        title: 'Não existe',
        message: `A comanda ${commandNumber}`,
        color: 'yellow'
      });
      return;
    }
    iziToast.show({
      title: 'Erro',
      message: `Aconteceu um erro inesperado, por favor, tente novamente`,
      color: 'red'
    });
  }
}

const payButtonHandler = (commandNumber, totalValue, credito, debito, dinheiro) => async () => {
  try {
    await store.dispatch(pay(commandNumber, totalValue, credito, debito, dinheiro));
    iziToast.show({
      title: 'Pago!',
      message: `Comanda ${commandNumber} paga com sucesso`,
      color: 'green'
    });
  } catch (e) {
    if (e.message === 'escolha um método de pagamento') {
      iziToast.show({
        title: 'Método de pagamento',
        message: `Escolha ao menos um método de pagamento`,
        color: 'red'
      });
      return;
    }
    iziToast.show({
      title: 'Erro',
      message: `Aconteceu um erro inesperado, por favor, tente novamente`,
      color: 'red'
    });
  }
}

const addToTotal = (itemValue) => {
  store.dispatch(sumTotalValue(itemValue));
}

const CaixaComponent = {
  _commandNumber: '',
  _boughtOnEntry: false,
  _editBoughtOnEntry: false,
  _paid: false,
  _bag: {},
  _editBag: {},
  _products: {},
  _totalValue: null,
  _credito: false,
  _debito: false,
  _dinheiro: false,
  _edit: false,
  props: {
    cashier: {
      commandNumber: '',
      bag: {},
      editBag: {},
      paid: false,
      boughtOnEntry: false,
      editBoughtOnEntry: false,
      products: {},
      totalValue: null,
      debito: false,
      credito: false,
      dinheiro: false,
      edit: false,
    },
  },
  render: ({ _commandNumber, _boughtOnEntry, _editBoughtOnEntry, _paid, _bag, _editBag, _products, _totalValue, _credito, _debito, _dinheiro, _edit, props }) => html`
    <style>
      ${styles}
      .center-block {
        display: table;  /* Instead of display:block */
        margin-left: auto;
        margin-right: auto;
      }
    </style>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center">Caixa</h1>
          ${FindCommandComponent(changeInputState, _commandNumber, findCommandHandler, onlyNumbers)}
          <br/>
          ${showPaid(_paid)}
          <br/>
          ${BagListComponent(_bag, _products, _boughtOnEntry, _edit, _editBag, onlyNumbers, changeBagEditStateHandler, changeEditBoughtOnEntryHandler, _editBoughtOnEntry)}
          ${showTotalValue(_totalValue)}
          <div class="col">
            ${PayComponent(changeCheckboxState, _dinheiro, _credito, _debito, _commandNumber, _totalValue, _paid, payButtonHandler, _edit, changeEditState, changeBagHandler)}
          </div>
        </div>
      </div>
    </div>
  `
}

const paymentButton = (payButtonHandler, commandNumber, totalValue, credito, debito, dinheiro, paid) => html`
  <button type="button" onclick=${payButtonHandler(commandNumber, totalValue, credito, debito, dinheiro)} class="btn btn-primary btn-lg" disabled=${paid}>Pagar</button>
`

const showPaid = (paid) => html`
  ${
    paid ?
      html`<p class="text-center"> Pago! </p>`:
    ''
  }
`

const showTotalValue = (totalValue) => html`
  ${
    totalValue !== null ?
      html`<p class="text-center"> Valor total - ${totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})}</p>` :
      ''
  }
`

const connectedCaixaComponent = (
  connectedCommandNumber,
  connectedBoughtOnEntry,
  connectedEditBoughtOnEntry,
  connectedPaid,
  connectedBag,
  connectedEditBag,
  connectedProducts,
  connectedTotalValue,
  connectedCredito,
  connectedDebito,
  connectedDinheiro,
  connectedEdit
) => {
  CaixaComponent._commandNumber = connectedCommandNumber;
  CaixaComponent._boughtOnEntry = connectedBoughtOnEntry;
  CaixaComponent._editBoughtOnEntry = connectedEditBoughtOnEntry;
  CaixaComponent._paid = connectedPaid;
  CaixaComponent._bag = connectedBag;
  CaixaComponent._editBag = connectedEditBag;
  CaixaComponent._products = connectedProducts;
  CaixaComponent._totalValue = connectedTotalValue;
  CaixaComponent._credito = connectedCredito;
  CaixaComponent._debito = connectedDebito;
  CaixaComponent._dinheiro = connectedDinheiro;
  CaixaComponent._edit = connectedEdit;
  return CaixaComponent;
}

const caixa = connectedCaixaComponent(
  connect(store, ({ cashier }) => cashier.commandNumber),
  connect(store, ({ cashier }) => cashier.boughtOnEntry),
  connect(store, ({ cashier }) => cashier.editBoughtOnEntry),
  connect(store, ({ cashier }) => cashier.paid),
  connect(store, ({ cashier }) => cashier.bag),
  connect(store, ({ cashier }) => cashier.editBag),
  connect(store, ({ cashier }) => cashier.products),
  connect(store, ({ cashier }) => cashier.totalValue),
  connect(store, ({ cashier }) => cashier.credito),
  connect(store, ({ cashier }) => cashier.debito),
  connect(store, ({ cashier }) => cashier.dinheiro),
  connect(store, ({ cashier }) => cashier.edit)
);

define('app-caixa', caixa);