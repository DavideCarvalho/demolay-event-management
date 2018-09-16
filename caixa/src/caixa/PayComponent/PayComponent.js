import { html } from 'hybrids';
import PaymentMethodsComponent from '../PaymentMethodsComponent/PaymentMethodsComponent';

const PayComponent = (changeCheckboxState, dinheiro, credito, debito, commandNumber, totalValue, paid, payButtonHandler, edit, changeEditState, changeBag) => html`
  ${
    totalValue !== null ?
    html`
      ${PaymentMethodsComponent(changeCheckboxState, dinheiro, credito, debito)}
      <br/>
      <br/>
      <div class="row text-center">
        <div class="col">
          ${paymentButton(payButtonHandler, commandNumber, totalValue, credito, debito, dinheiro, paid, edit)}
          ${
            edit ?
            html`
              <button type="button" class="btn btn-warning btn-lg" onclick=${changeBag}>Okay</button>
              <button type="button" class="btn btn-danger btn-lg" onclick=${changeEditState(edit)}>Cancelar</button>
              ` :
            html`<button type="button" class="btn btn-success btn-lg" onclick=${changeEditState(edit)}>Editar</button>`
          }
        </div>
      </div>
      ` :
      ''
  }
`

const paymentButton = (payButtonHandler, commandNumber, totalValue, credito, debito, dinheiro, paid) => html`
  <button type="button" onclick=${payButtonHandler(commandNumber, totalValue, credito, debito, dinheiro)} class="btn btn-primary btn-lg" disabled=${paid}>Pagar</button>
`
// ${
//   edit ?
//   html`
//     <button type="button" class="btn btn-warning btn-lg" onclick=${changeBag}>Okay</button>
//     <button type="button" class="btn btn-danger btn-lg" onclick=${changeEditState(edit)}>Cancelar</button>
//     ` :
//   html`<button type="button" class="btn btn-success btn-lg" onclick=${changeEditState(edit)}>Editar</button>`
// }
export default PayComponent;