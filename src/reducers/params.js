import { RECTANGLE, LINE, ELLIPSE } from '../enums';
import { CHANGE_PARAM, CHANGE_SHAPE_PARAM } from '../actions';

const params = (state = {
  shapeSelected: LINE,
  shapes: {
    [ LINE ]: {
      continuous: false,
      curved: false,
      width: 3
    },
    [ RECTANGLE ]: {
      square: false
    },
    [ ELLIPSE ]: {
      circle: false
    }
  },
  colorSelected: 'blue'
}, action) => {
  switch (action.type) {
    case CHANGE_PARAM:
      const newState = Object.assign({}, state, { [action.key]: action.value });
      return newState;
    case CHANGE_SHAPE_PARAM:
      const newShape = Object.assign({}, state.shapes[action.shapeType], { [action.key]: action.value });
      const newShapes = Object.assign({}, state.shapes, { [action.shapeType]: newShape });
      const newState = Object.assign({}, state, { shapes: newShapes });
      return newState;
    default:
      return state;
  }
};

export default params;
