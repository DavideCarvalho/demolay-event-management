// Add shims and polyfills
import './src';

let element;
let fatherElement;
let styleElement;

const style = `
app-caixa {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  overflow: hidden
}
`

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
    const head = document.head;
    styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    head.appendChild(styleElement);
    fatherElement = document.getElementById('app')
    element = document.createElement('app-caixa');
    fatherElement.appendChild(element);
  })
}

export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      fatherElement.removeChild(element);
      document.head.removeChild(styleElement);
  });
}