import { connect } from 'react-redux';
import { RECTANGLE, ELLIPSE, LINE, POLYGON } from '../enums';
import { REQUEST_DOWNLOAD, prepareDownload, readyDownload, beginShape, updateShape, endShape, cancelShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  marginLeft: state.windowSize.width * 0.25,
  marginTop: 0,
  width: state.windowSize.width * 0.75,
  height: state.windowSize.height,
  shapes: state.shapes.drawn,
  newShape: state.shapes.new,
  newShapeParams: {
    type: state.params.shapeSelected,
    color: state.params.colorSelected,
    options: state.params.shapes[state.params.shapeSelected]
  },
  isDrawing: state.shapes.new !== null,
  isContinuous:
    (state.params.shapeSelected === LINE && state.params.shapes[LINE].continuous) ||
    state.params.shapeSelected === POLYGON,
  isRegular: (
    (state.params.shapeSelected === RECTANGLE && state.params.shapes[RECTANGLE].square) ||
    (state.params.shapeSelected === ELLIPSE && state.params.shapes[ELLIPSE].circle)
  ),
  shouldPrepareDownload: state.download.type === REQUEST_DOWNLOAD
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onBeginShape: (type, x, y, color, extras = null) => {
    dispatch(beginShape(type, x, y, color, extras));
  },

  onUpdateShape: (x, y, extras = null) => {
    dispatch(updateShape(x, y, extras));
  },

  onEndShape: (x, y, extras = null) => {
    dispatch(endShape(x, y, extras));
  },

  onCancelShape: (type, extras = null) => {
    dispatch(cancelShape(type, extras));
  },

  onPreparingDownload: () => {
    dispatch(prepareDownload());
  },

  onDownloadReady: (dataUrl) => {
    dispatch(readyDownload(dataUrl));
  }
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
