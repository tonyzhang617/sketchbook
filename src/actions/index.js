export const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE';

export const updateWindowSize = (_width, _height) => ({
  type: UPDATE_WINDOW_SIZE,
  width: _width,
  height: _height
});
