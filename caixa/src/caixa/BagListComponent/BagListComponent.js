import { html } from 'hybrids';


const BagListComponent =  (bag, products, boughtOnEntry, edit, editBag, onlyNumbers, changeEditBagState, changeEditBoughtOnEntryState, editBoughtOnEntry) => html`
  ${
    edit ?
    html`${showEditList(editBag, boughtOnEntry, products, onlyNumbers, changeEditBagState, changeEditBoughtOnEntryState, editBoughtOnEntry)}` :
    html`${showListOfProducts(bag, boughtOnEntry, products)}`
  }
`;

const showEditList = (editBag, boughtOnEntry, products, onlyNumbers, changeEditBagState, changeEditBoughtOnEntryState, editBoughtOnEntry) => html`
<ul>
  ${
    editBoughtOnEntry ?
    html`<li>Entrada - R$30,00</li><button onclick=${changeEditBoughtOnEntryState(editBoughtOnEntry)} class="btn btn-success">Trocar</button>` :
    html`<li>Convite não foi pego na entrada</li><button onclick=${changeEditBoughtOnEntryState(editBoughtOnEntry)} class="btn btn-success">Trocar</button>` 
  }
  ${
    editBag && Object.keys(editBag).length ?
    Object.keys(editBag).map(key => {
      const quantity = editBag[key].quantity;
      const unitValue = products[key];
      const finalValue = unitValue * quantity;
      return html`
        <li><input onkeypress=${onlyNumbers} oninput=${changeEditBagState} type="text" value=${quantity} style="width: 30px" id=${key} />x ${key} - ${finalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})}</li>
      `
    }) :
    ''
  }
</ul>
`

const showListOfProducts = (bag, boughtOnEntry, products) => html`
<ul>
  ${
    boughtOnEntry ?
    html`<li>Entrada - R$30,00</li>` :
    ''
  }
  ${
    bag && Object.keys(bag).length ?
    Object.keys(bag).map(key => {
      const quantity = bag[key].quantity;
      const unitValue = products[key];
      const finalValue = unitValue * quantity;
      return html`
        <li>${quantity}x ${key} - ${finalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})}</li>
      `
    }) :
    ''
  }
</ul>
`

export default BagListComponent;