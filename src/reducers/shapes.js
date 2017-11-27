import { BEGIN_SHAPE, UPDATE_SHAPE, END_SHAPE, CANCEL_SHAPE } from '../actions';
import { DELETE_SHAPE, REMOVE_LAST_POINT } from '../enums';

const shapes = (state = { drawn: [], new: null }, action) => {
  switch (action.type) {
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
        }
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
          }
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

      const _result = {
        drawn: state.drawn.concat([Object.assign(
          _newShape, {
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
          }
        )]),
        new: null
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
            new: null
          };
        case REMOVE_LAST_POINT:
          let __newShape = Object.assign({}, state.new);
          delete __newShape.new;
          let _newPoints = [...state.new.points];
          _newPoints.pop();
          _newPoints.pop();
          let newDrawn = (
            _newPoints.length <= 2 ? state.drawn :
            state.drawn.concat([Object.assign(__newShape, { points: _newPoints })])
          );
          return {
            drawn: newDrawn,
            new: null
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default shapes;
