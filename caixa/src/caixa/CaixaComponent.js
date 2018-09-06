import { html, define } from 'hybrids';

const CaixaComponent = {
  render: () => html`
    <h1>CaixaComponent</h1>
  `
}

define('app-caixa', CaixaComponent);