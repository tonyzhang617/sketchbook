import { UPDATE_SHAPE, END_SHAPE } from '../actions';

const shapes = (state = { drawn: [], new: null }, action) => {
  switch (action.type) {
    case UPDATE_SHAPE:
      return {
        drawn: state.drawn,
        new: state.new === null ? {
          type: action.shapeType,
          color: action.color,
          points: [
            action.newX,
            action.newY
          ],
          angle: action.angle
        } : {
          type: action.shapeType,
          color: action.color,
          points: [
            state.new.points[0],
            state.new.points[1],
            action.newX,
            action.newY
          ],
          angle: action.angle
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
          angle: action.angle
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
