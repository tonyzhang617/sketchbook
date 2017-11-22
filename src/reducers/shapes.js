import { UPDATE_SHAPE, END_SHAPE } from '../actions';

const shapes = (state = { drawn: [], new: null }, action) => {
  switch (action.type) {
    case UPDATE_SHAPE:
      let result = null;
      if (state.new === null) {
        result = ({
          drawn: state.drawn,
          new: {
            key: 0,
            type: action.extras.type,
            color: action.extras.color,
            curved: action.extras.curved ? true : false,
            points: [action.newX, action.newY, action.newX, action.newY]
          }
        });
      } else {
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

      let _newShape = state.new;
      if (action.extras) {
        _newShape = Object.assign({}, state.new, action.extras);
      }

      let newPoints = [...state.new.points];
      newPoints.pop();
      newPoints.pop();

      const _result = {
        drawn: state.drawn.concat([{
          ..._newShape,
          key: state.drawn.length + 1,
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
        }]),
        new: null
      };
      return _result;
    default:
      return state;
  }
};

export default shapes;
