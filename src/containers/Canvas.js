import { connect } from 'react-redux';
import { RECTANGLE, ELLIPSE, LINE } from '../enums';
import { updateShape, endShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  width: state.windowSize.width - 10,
  height: state.windowSize.height - 10,
  shapes: state.shapes.drawn,
  newShape: state.shapes.new,
  newShapeParams: {
    type: state.params.shapeSelected,
    color: state.params.colorSelected,
    options: state.params.shapes[state.params.shapeSelected]
  },
  isDrawing: state.shapes.new !== null,
  shouldLeftClickEndDrawing: !state.params.shapes[LINE].continuous
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateShape: (x, y, extras = null) => {
    dispatch(updateShape(x, y, extras));
  },

  onEndShape: (x, y, extras = null) => {
    dispatch(endShape(x, y, extras));
  }
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
