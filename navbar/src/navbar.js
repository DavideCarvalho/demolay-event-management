import { html, define } from 'hybrids';
import { navigateToUrl } from 'single-spa';
import styles from './css/bootstrap.js';

const Navbar = {
  render: () => html`
  <style>
    ${styles}
  </style>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <div id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/" onClick=${navigateToUrl}>Entrada</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/caixa" onClick=${navigateToUrl}>Caixa</a>
        </li>
      </ul>
    </div>
  </nav>
  `
}

define('app-navbar', Navbar);