import { html } from 'hybrids';

const BagListComponent = (bag) => html`
  <ul>
    ${
      Object.keys(bag).map(key => 
        html`
          <li>${bag[key].quantity}x ${bag[key].item}</li>
        `
      )
    }
  </ul>
`;

export default BagListComponent;