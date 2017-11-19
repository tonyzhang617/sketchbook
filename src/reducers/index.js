import shapes from './shapes';
import windowSize from './windowSize';
import shapeParams from './shapeParams';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  shapes,
  windowSize,
  shapeParams
});

export default reducer;
