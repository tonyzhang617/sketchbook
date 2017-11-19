import { connect } from 'react-redux';
import { SQUARE, ELLIPSE, LINE } from '../enums';
import { updateShape, endShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  width: state.windowSize.width - 10,
  height: state.windowSize.height - 10,
  shapes: state.shapes.drawn,
  newShape: state.shapes.new,
  isDrawing: state.shapes.new !== null
});

let isMouseDown = false;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateShape: ({ evt }) => {
    dispatch(updateShape(SQUARE, 'blue', evt.offsetX, evt.offsetY, 0));
  },

  onEndShape: ({ evt }) => {
    dispatch(endShape(SQUARE, 'blue', evt.offsetX, evt.offsetY, 0));
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
