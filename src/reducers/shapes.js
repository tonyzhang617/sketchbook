import { UPDATE_SHAPE, FINISH_SHAPE } from '../actions';

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
            ...state.new.points,
            action.newX,
            action.newY
          ],
          angle: action.angle
        }
      };
    case FINISH_SHAPE:
      let newState = {
        drawn: state.drawn.concat([ state.new ]),
        new: null
      };
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default shapes;
