import { connect } from 'react-redux';
import { LINE, RECTANGLE, ELLIPSE } from '../enums';
import { setParam, setShapeParam } from '../actions';
import PaletteSidebar from '../components/PaletteSidebar';

const mapStateToProps = state => ({
  windowWidth: state.windowSize.width,
  windowHeight: state.windowSize.height,
  shapeSelected: state.params.shapeSelected,
  colorSelected: state.params.colorSelected,
  lineParams: state.params.shapes[LINE],
  rectParams: state.params.shapes[RECTANGLE],
  ellipseParams: state.params.shapes[ELLIPSE]
});

const mapDispatchToProps = dispatch => ({
  setParam: (key, value) => {
    dispatch(setParam(key, value));
  },

  setShapeParam: (shapeType, key, value) => {
    dispatch(setShapeParam(shapeType, key, value));
  }
});

const PaletteSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(PaletteSidebar);

export default PaletteSidebarContainer;
