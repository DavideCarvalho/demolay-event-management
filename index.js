import * as singleSpa from 'single-spa';
import './navbar';

const entradaAppName = 'entrada';
const entradaLoadingFunction = () => import('./entrada');
const entradaActivityFunction = location => location.pathname === '/';
singleSpa.registerApplication(entradaAppName, entradaLoadingFunction, entradaActivityFunction);

const caixaAppName = 'caixa';
const caixaLoadingFunction = () => import('./caixa');
const caixaActivityFunction = location => location.pathname === '/caixa';
singleSpa.registerApplication(caixaAppName, caixaLoadingFunction, caixaActivityFunction);


singleSpa.start();