import shapes from './shapes';
import windowSize from './windowSize';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  shapes,
  windowSize
});

export default reducer;
