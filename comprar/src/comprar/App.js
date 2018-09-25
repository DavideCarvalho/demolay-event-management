import { html, define } from 'hybrids';

const App = {
  render: () => html`
    <app-comprar></app-comprar>
  `,
};

define('app-teste', App);
