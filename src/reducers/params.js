import { RECTANGLE, LINE, ELLIPSE } from '../enums';
import { SET_PARAM, SET_SHAPE_PARAM } from '../actions';

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
    case SET_PARAM:
      let newState = Object.assign({}, state, { [action.key]: action.value });
      return newState;
    case SET_SHAPE_PARAM:
      const newShape = Object.assign({}, state.shapes[action.shapeType], { [action.key]: action.value });
      const newShapes = Object.assign({}, state.shapes, { [action.shapeType]: newShape });
      let _newState = Object.assign({}, state, { shapes: newShapes });
      return _newState;
    default:
      return state;
  }
};

export default params;
