import { connect } from 'react-redux';
import { RECTANGLE, ELLIPSE, LINE } from '../enums';
import { beginShape, updateShape, endShape, cancelShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  marginLeft: state.windowSize.width * 0.25,
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
  isContinuous: !state.params.shapes[LINE].continuous,
  isRegular: (
    (state.params.shapeSelected === RECTANGLE && state.params.shapes[RECTANGLE].square) ||
    (state.params.shapeSelected === ELLIPSE && state.params.shapes[ELLIPSE].circle)
  )
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
  }
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
