// Add shims and polyfills
// import 'hybrids/shim';
// import './src/entrada/EntradaComponent'
import './src';

let element;
let fatherElement;
let styleElement;

const style = `
app-entrada {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  overflow: hidden
}
`;

export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
    });
}

export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      const { head } = document;
      styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(style));
      head.appendChild(styleElement);
      fatherElement = document.getElementById('app');
      element = document.createElement('app-entrada');
      fatherElement.appendChild(element);
    });
}

export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      fatherElement.removeChild(element);
      document.head.removeChild(styleElement);
    });
}
