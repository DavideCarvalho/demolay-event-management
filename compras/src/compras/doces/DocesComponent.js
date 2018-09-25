import { html } from 'hybrids';


const DocesComponent = (connectedSweet, onInput, onlyNumbers) => html`
  <label for="inputEmail" class="sr-only">Quantidade de doces</label>
  <input id="sweetQuantity" onkeypress=${onlyNumbers} oninput=${onInput} value=${connectedSweet} type="text" id="sweetQuantity" class="form-control" placeholder="Quantidade de doces">
`

export default DocesComponent;