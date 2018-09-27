import { combineReducers } from 'redux';
import buy from './buy';
import products from './products';

export default combineReducers({
  buy,
  products,
});
