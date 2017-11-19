import { SQUARE, LINE, ELLIPSE } from '../enums';

const shapeParams = (state = { type: SQUARE, color: 'blue' }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shapeParams;
