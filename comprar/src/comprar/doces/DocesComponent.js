import { html } from 'hybrids';


const DocesComponent = (connectedSweet, onInput) => html`
  <label for="inputEmail" class="sr-only">Quantidade de doces</label>
  <input id="commandNumber" oninput=${onInput} value=${connectedSweet} type="text" id="sweetQuantity" class="form-control" placeholder="Quantidade de doces">
`

export default DocesComponent;