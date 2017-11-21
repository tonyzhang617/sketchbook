export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';

export const CHANGE_PARAM = 'CHANGE_PARAM';
export const CHANGE_SHAPE_PARAM = 'CHANGE_SHAPE_PARAM';

export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const END_SHAPE = 'END_SHAPE';

export const updateWindowSize = (_width, _height) => ({
  type: UPDATE_WINDOW_SIZE,
  width: _width,
  height: _height
});

export const changeParam = (key, value) => ({
  type: CHANGE_PARAM,
  key: key,
  value: value
});

export const changeShapeParam = (shapeType, key, value) => ({
  type: CHANGE_SHAPE_PARAM,
  shapeType: shapeType,
  key: key,
  value: value
});

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
