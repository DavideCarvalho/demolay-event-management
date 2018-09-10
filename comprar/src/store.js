import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const rootStore = createStore(
  rootReducer,
  compose(
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  )
);

export default rootStore;