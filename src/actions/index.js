export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const FINISH_SHAPE = 'FINISH_SHAPE';

export const updateWindowSize = (_width, _height) => ({
  type: UPDATE_WINDOW_SIZE,
  width: _width,
  height: _height
});

export const updateShape = (_type, _color, _newX, _newY, _angle) => ({
  type: UPDATE_SHAPE,
  shapeType: _type,
  color: _color,
  newX: _newX,
  newY: _newY,
  angle: _angle
});

export const finishShape = () => ({
  type: FINISH_SHAPE
});
