import shapes from './shapes';
import windowSize from './windowSize';
import params from './params';
import download from './download';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  shapes,
  windowSize,
  params,
  download
});

export default reducer;
