import { html, define } from 'hybrids';
import { navigateToUrl } from 'single-spa'
import styles from './css/bootstrap.js';


const changeRoute = (host, e) => {
  history.pushState(null, null, '/');
}

const CaixaComponent = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <h1>CaixaComponent</h1>
    <a href="/" onClick=${navigateToUrl}>Teste</a>
  `
}

define('app-caixa', CaixaComponent);