import { connect } from 'react-redux';
import { SQUARE, ELLIPSE, LINE } from '../enums';
import { updateShape, endShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  width: state.windowSize.width - 10,
  height: state.windowSize.height - 10,
  shapes: state.shapes.drawn,
  newShape: state.shapes.new,
  newShapeParams: state.shapeParams,
  isDrawing: state.shapes.new !== null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateShape: (shapeType, color, x, y, angle) => {
    dispatch(updateShape(shapeType, color, x, y, angle));
  },

  onEndShape: (shapeType, color, x, y, angle) => {
    dispatch(endShape(shapeType, color, x, y, angle));
  }

  // , onMouseDown: ({ currentTarget, evt }) => {
  //   console.log(currentTarget);
  //   dispatch(updateShape(SQUARE, 'blue', evt.offsetX, evt.offsetY, 0));
  // },
  //
  // onMouseMove: e => {
  //   console.log('mouse moved');
  // },
  //
  // onMouseUp: e => {
  //   dispatch(endShape());
  // }
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
