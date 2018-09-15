import { html } from 'hybrids';

const FindCommandComponent = (changeState, commandNumber, onClickHandler, onlyNumbers) => html`
<div class="input-group">
  <input onkeypress=${onlyNumbers} oninput=${changeState} value=${commandNumber} id="commandNumber" type="text" class="form-control" placeholder="Número da comanda">
  <button type="button" onclick=${onClickHandler(commandNumber)} class="btn btn-primary">Procurar</button>
</div>
`

export default FindCommandComponent;