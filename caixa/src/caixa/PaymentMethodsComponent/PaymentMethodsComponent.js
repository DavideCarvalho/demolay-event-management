import { html } from 'hybrids';

const PaymentMethodsComponent = (changeCheckboxState, dinheiro, credito, debito) => html`
<div class="custom-control custom-checkbox custom-control-inline center-block">
  <input type="checkbox" onchange=${changeCheckboxState} checked=${debito} id="debito" name="debito" class="custom-control-input">
  <label class="custom-control-label" for="debito">Débito</label>
</div>
<div class="custom-control custom-checkbox custom-control-inline center-block">
  <input type="checkbox" onchange=${changeCheckboxState} checked=${credito} id="credito" name="credito" class="custom-control-input">
  <label class="custom-control-label" for="credito">Crédito</label>
</div>
<div class="custom-control custom-checkbox custom-control-inline center-block">
  <input type="checkbox" onchange=${changeCheckboxState} checked=${dinheiro} id="dinheiro" name="dinheiro" class="custom-control-input">
  <label class="custom-control-label" for="dinheiro">Dinheiro</label>
</div>
`

export default PaymentMethodsComponent;