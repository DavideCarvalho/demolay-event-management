import { html } from 'hybrids';

const BebidasComponent = (connectedDrink, changeState, selectedDrink, onlyNumbers) => html`
  <select value=${selectedDrink} onchange=${changeState} class="form-control" id="selectedDrink">
    <option value="" selected disabled hidden>Escolha uma bebida</option>
    <option value="agua">Água</option>
    <option value="suco">Suco</option>
    <option value="refrigerante">Refrigerante</option>
    <option value="cerveja">Cerveja</option>
  </select>
  <br />
  <label for="inputEmail" class="sr-only">Quantidade de bebida</label>
  <input onkeypress=${onlyNumbers} oninput=${changeState} value=${connectedDrink} type="text" id="drinkQuantity" class="form-control" placeholder="Quantidade de ${selectedDrink}">
`

export default BebidasComponent;