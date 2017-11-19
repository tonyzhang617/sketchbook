import { SQUARE, LINE, ELLIPSE } from '../enums';

const shapeParams = (state = { type: LINE, color: 'blue' }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shapeParams;
