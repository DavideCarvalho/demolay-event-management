import { html } from 'hybrids';


const BagListComponent = (bag, products, boughtOnEntry) => html`
  <ul>
    ${
      boughtOnEntry ?
      html`<li>Entrada - R$30,00</li>` :
      ''
    }
    ${
      Object.keys(bag).map(key => {
        const quantity = bag[key].quantity;
        const item = bag[key].item;
        const unitValue = products[item];
        const finalValue = unitValue * quantity;
        return html`
          <li>${quantity}x ${item} - ${finalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})}</li>
        `
      })
    }
  </ul>
`;

export default BagListComponent;