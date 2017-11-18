import { UPDATE_WINDOW_SIZE } from '../actions';

const windowSize = (state = { width: 800, height: 600 }, action) => {
  switch (action.type) {
    case UPDATE_WINDOW_SIZE:
      return {
        width: action.width,
        height: action.height
      };
    default:
      return state;
  }
}

export default windowSize;
