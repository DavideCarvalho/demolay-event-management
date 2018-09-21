import { html } from 'hybrids';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import styles from './entrada/css/bootstrap';

export const showMessage = ({ title, message, color }) => {
  iziToast.show({
    title,
    message,
    color,
  });
};

export const addBootstrapStyle = html`
  <style>
    ${styles}
  </style>
`;
