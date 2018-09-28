import { combineReducers } from 'redux';
import buy from './buy';
import products from './products';
import cart from './cart';

export default combineReducers({
  buy,
  products,
  cart,
});
