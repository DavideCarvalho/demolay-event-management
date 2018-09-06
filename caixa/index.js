// Add shims and polyfills
import 'hybrids/shim';
import './src/caixa/CaixaComponent';

let element;
let styleElement;

const style = `
html,
body {
  height: 100%;
  font-family: sans-serif
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  overflow: hidden
}

app-entrada {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
`

export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      const head = document.head;
      styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(style));
      head.appendChild(styleElement);
      element = document.createElement('app-caixa');
      document.body.appendChild(element)
  });
}

export function mount(props) {
  return Promise
  .resolve()
  .then(() => {
    console.log('app mounted')
  })
}

export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      element.parent.removeChild(element);
      styleElement.parent.removeChild(styleElement);
  });
}