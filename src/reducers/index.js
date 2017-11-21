import shapes from './shapes';
import windowSize from './windowSize';
import params from './params';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  shapes,
  windowSize,
  params
});

export default reducer;
