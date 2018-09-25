import { html } from 'hybrids';

export default ({ radioLabel, value, onChange, checked }) => html`
  <div class="custom-control custom-radio custom-control-inline">
    <input type="radio" id=${radioLabel} name="customRadioInline1" class="custom-control-input" value=${value} onchange=${onChange} checked=${checked}>
    <label class="custom-control-label" for=${radioLabel}>${radioLabel}</label>
  </div>
`;