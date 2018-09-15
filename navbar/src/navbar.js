import { html, define } from 'hybrids';
import { navigateToUrl } from 'single-spa';
import styles from './css/bootstrap.js';

const changeRoute = (rota) => (host, e) => {
  e.preventDefault();
  navigateToUrl(rota)
}

const Navbar = {
  render: () => html`
  <style>
    ${styles}
  </style>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <a class="navbar-brand" href="#">DEMO</a>
    <div id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/" onclick=${changeRoute('/')}>Entrada</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/comprar" onclick=${changeRoute('/comprar')}>Comprar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/caixa" onclick=${changeRoute('/caixa')}>Caixa</a>
        </li>
      </ul>
    </div>
  </nav>
  `
}

define('app-navbar', Navbar);