export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';

export const SET_PARAM = 'SET_PARAM';
export const SET_SHAPE_PARAM = 'SET_SHAPE_PARAM';

export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const END_SHAPE = 'END_SHAPE';

export const updateWindowSize = (_width, _height) => ({
  type: UPDATE_WINDOW_SIZE,
  width: _width,
  height: _height
});

export const setParam = (key, value) => ({
  type: SET_PARAM,
  key: key,
  value: value
});

export const setShapeParam = (shapeType, key, value) => ({
  type: SET_SHAPE_PARAM,
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
