import * as singleSpa from 'single-spa';

const appName = 'entrada';

const loadingFunction = () => import('./entrada');

const activityFunction = location => location.pathname.startsWith('/');

singleSpa.registerApplication(appName, loadingFunction, activityFunction);
singleSpa.start();