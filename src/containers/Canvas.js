import { connect } from 'react-redux';
import { SQUARE, ELLIPSE, LINE } from '../enums';
import { updateShape, finishShape } from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  width: state.windowSize.width - 10,
  height: state.windowSize.height - 10,
  shapes: state.shapes.drawn,
  newShape: state.shapes.new
});

let isMouseDown = false;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseDown: ({ evt }) => {
    dispatch(updateShape(SQUARE, 'blue', evt.offsetX, evt.offsetY, 0));
  },

  onMouseMove: e => {
    // console.log(e);
  },

  onMouseUp: e => {
    dispatch(finishShape());
  }
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default CanvasContainer;
