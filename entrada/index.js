// Add shims and polyfills
// import 'hybrids/shim';
// import './src/entrada/EntradaComponent'
import './src';

let element;
let fatherElement;
let styleElement;

const style = `
html,
body {
  height: 100%;
  font-family: sans-serif;
  overflow: hidden;
}

#app {
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  margin-top: -5%;
}

app-entrada {
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
      const head = document.head;
      styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(style));
      head.appendChild(styleElement);
      let fatherElement = document.getElementById('app')
      element = document.createElement('app-entrada');
      fatherElement.appendChild(element);
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
      fatherElement.removeChild(element);
      document.head.removeChild(styleElement);
  });
}