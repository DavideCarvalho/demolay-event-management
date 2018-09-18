import { html } from 'hybrids';
import styles from './entrada/css/bootstrap';

export const connectComponent = (reduxStore, reduxStoreDictionary, component) => {
  const store = reduxStore.getState();
  Object.keys(store).forEach(reduxStoreName => {
    const componentProperty = reduxStoreDictionary[reduxStoreName];
    component.props[componentProperty] = store[reduxStoreName];
  });
  return component;
}

export const addBootstrapStyle = html`
  <style>
    ${styles}
  </style>
`