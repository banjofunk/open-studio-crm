import { combineReducers } from 'redux';
import classType from './classType'
import classTypes from './classTypes'
import classEvent from './classEvent'
import classEvents from './classEvents'
import user from './user';
import users from './users';
import locations from './locations';
import location from './location';
import room from './room';
import rooms from './rooms';
import product from './product';
import products from './products';

export default combineReducers({
  classType,
  classTypes,
  classEvent,
  classEvents,
  user,
  users,
  location,
  locations,
  room,
  rooms,
  product,
  products
});
