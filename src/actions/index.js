export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';
// export const BEGIN_SHAPE = 'BEGIN_SHAPE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const END_SHAPE = 'END_SHAPE';

export const updateWindowSize = (_width, _height) => ({
  type: UPDATE_WINDOW_SIZE,
  width: _width,
  height: _height
});

// export const beginShape = (_type, _color, _x, _y, _angle) => ({
//   type: BEGIN_SHAPE,
//   shapeType: _type,
//   color: _color,
//   x: _x,
//   y: _y,
//   angle: _angle
// });

export const updateShape = (_type, _color, _newX, _newY, _angle) => ({
  type: UPDATE_SHAPE,
  shapeType: _type,
  color: _color,
  newX: _newX,
  newY: _newY,
  angle: _angle
});

export const endShape = (_type, _color, _newX, _newY, _angle) => ({
  type: END_SHAPE,
  shapeType: _type,
  color: _color,
  newX: _newX,
  newY: _newY,
  angle: _angle
});
