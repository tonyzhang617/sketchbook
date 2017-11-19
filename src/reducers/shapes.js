import { UPDATE_SHAPE, END_SHAPE } from '../actions';

const shapes = (state = { drawn: [], new: null }, action) => {
  switch (action.type) {
    case UPDATE_SHAPE:
      return {
        drawn: state.drawn,
        new: {
          type: action.shapeType,
          color: action.color,
          points: (state.new === null) ? [
            action.newX,
            action.newY
          ] : [
            state.new.points[0],
            state.new.points[1],
            action.newX,
            action.newY
          ],
          angle: action.angle,
          key: 0
        }
      };
    case END_SHAPE:
      let newState = {
        drawn: state.drawn.concat([{
          type: action.shapeType,
          color: action.color,
          points: [
            state.new.points[0],
            state.new.points[1],
            action.newX,
            action.newY
          ],
          angle: action.angle,
          key: state.drawn.length + 1
        }]),
        new: null
      };
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default shapes;
