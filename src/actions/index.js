export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';

export const SET_PARAM = 'SET_PARAM';
export const SET_SHAPE_PARAM = 'SET_SHAPE_PARAM';

export const BEGIN_SHAPE = 'BEGIN_SHAPE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const END_SHAPE = 'END_SHAPE';
export const CANCEL_SHAPE = 'CANCEL_SHAPE';

export const REQUEST_DOWNLOAD = 'REQUEST_DOWNLOAD';
export const PREPARE_DOWNLOAD = 'PREPARE_DOWNLOAD';
export const READY_DOWNLOAD = 'READY_DOWNLOAD';
export const FINISH_DOWNLOAD = 'FINISH_DOWNLOAD';

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

export const beginShape = (shapeType, x, y, color = 'blue', extras = null) => ({
  type: BEGIN_SHAPE,
  shapeType: shapeType,
  x: x,
  y: y,
  color: color,
  extras: extras
});

export const updateShape = (x, y, extras = null) => ({
  type: UPDATE_SHAPE,
  newX: x,
  newY: y,
  extras: extras
});

export const endShape = (x, y, extras = null) => ({
  type: END_SHAPE,
  newX: x,
  newY: y,
  extras: extras
});

export const cancelShape = (type, extras = null) => ({
  type: CANCEL_SHAPE,
  cancelType: type,
  extras: extras
});

export const requestDownload = () => ({
  type: REQUEST_DOWNLOAD
});

export const prepareDownload = () => ({
  type: PREPARE_DOWNLOAD
});

export const readyDownload = (dataUrl) => ({
  type: READY_DOWNLOAD,
  dataUrl: dataUrl
});

export const finishDownload = () => ({
  type: FINISH_DOWNLOAD
});
