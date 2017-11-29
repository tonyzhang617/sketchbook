import { BEGIN_SHAPE, UPDATE_SHAPE, END_SHAPE, CANCEL_SHAPE, UNDO, REDO } from '../actions';
import { DELETE_SHAPE, REMOVE_LAST_POINT } from '../enums';
import { RECTANGLE, LINE, ELLIPSE, POLYGON } from '../enums';

const isValidShape = ({ type, points }) => {
  let result = false;
  switch (type) {
    case LINE:
    case RECTANGLE:
    case ELLIPSE:
      result = points.length >= 4;
      break;
    case POLYGON:
      result = points.length >= 6;
      break;
  }
  return result;
};

const shapes = (state = { drawn: [], new: null, popped: [] }, action) => {
  switch (action.type) {
    case UNDO:
      if (state.drawn.length === 0) {
        return state;
      }
      let newDrawn = state.drawn;
      let tmp = newDrawn.pop();
      return ({
        drawn: newDrawn,
        new: null,
        popped: state.popped.concat([tmp])
      });
    case REDO:
      if (state.popped.length === 0) {
        return state;
      }
      let newPopped = state.popped;
      let tmp2 = newPopped.pop();
      return ({
        drawn: state.drawn.concat([tmp2]),
        new: null,
        popped: newPopped
      });
    case BEGIN_SHAPE:
      let newState = ({
        drawn: state.drawn,
        new: {
          key: state.drawn.length,
          new: true,
          ...action.extras,
          type: action.shapeType,
          color: action.color,
          points: [action.x, action.y, action.x, action.y]
        },
        popped: state.popped
      });
      return newState;
    case UPDATE_SHAPE:
      let result = state;
      if (state.new != null) {
        let newShape = state.new;
        if (action.extras != null) {
          newShape = Object.assign({}, state.new, action.extras);
        }

        let newPoints = [...state.new.points];
        newPoints.pop();
        newPoints.pop();
        result = ({
          drawn: state.drawn,
          new: {
            ...state.new,
            points: ((action.extras != null && action.extras.append) ? [
              ...newPoints,
              action.newX,
              action.newY,
              action.newX,
              action.newY
            ] : [
              ...newPoints,
              action.newX,
              action.newY
            ])
          },
          popped: state.popped
        });
      }
      return result;
    case END_SHAPE:
      if (state.new === null) {
        return state;
      }

      let _newShape = Object.assign({}, state.new);
      if (action.extras) {
        _newShape = Object.assign({}, state.new, action.extras);
      }
      delete _newShape.new;

      let newPoints = [...state.new.points];
      newPoints.pop();
      newPoints.pop();

      let drawnShape = Object.assign(_newShape, {
        points: (
          (action.extras != null && action.extras.append) ? [
            ...newPoints,
            action.newX,
            action.newY,
            action.newX,
            action.newY
          ] : [
            ...newPoints,
            action.newX,
            action.newY
          ]
        )
      });

      const _result = {
        drawn: isValidShape(drawnShape) ? state.drawn.concat([drawnShape]) : state.drawn,
        new: null,
        popped: []
      };
      return _result;
    case CANCEL_SHAPE:
      if (state.new == null) {
        return state;
      }
      switch (action.cancelType) {
        case DELETE_SHAPE:
          return {
            drawn: state.drawn,
            new: null,
            popped: []
          };
        case REMOVE_LAST_POINT:
          let __newShape = Object.assign({}, state.new);
          delete __newShape.new;
          let _newPoints = [...state.new.points];
          _newPoints.pop();
          _newPoints.pop();
          let _drawnShape = Object.assign(__newShape, { points: _newPoints });
          return {
            drawn: isValidShape(_drawnShape) ? state.drawn.concat([_drawnShape]) : state.drawn,
            new: null,
            popped: []
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default shapes;
