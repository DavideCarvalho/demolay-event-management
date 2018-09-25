import { html } from 'hybrids';
import { onlyNumbers } from '../../utils';

const DocesComponent = ({ sweetQuantity, changeState }) => html`
  <label for="inputEmail" class="sr-only">Quantidade de doces</label>
  <input id="sweetQuantity" onkeypress=${onlyNumbers} oninput=${changeState} value=${sweetQuantity} type="text" id="sweetQuantity" class="form-control" placeholder="Quantidade de doces">
`;

export default DocesComponent;
