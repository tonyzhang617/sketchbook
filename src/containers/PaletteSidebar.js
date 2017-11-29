import { connect } from 'react-redux';
import { LINE, RECTANGLE, ELLIPSE, POLYGON } from '../enums';
import { undo, redo, PREPARE_DOWNLOAD, READY_DOWNLOAD, requestDownload, prepareDownload, finishDownload, setParam, setShapeParam } from '../actions';
import PaletteSidebar from '../components/PaletteSidebar';

const mapStateToProps = state => ({
  windowWidth: state.windowSize.width,
  windowHeight: state.windowSize.height,
  shapeSelected: state.params.shapeSelected,
  colorSelected: state.params.colorSelected,
  lineParams: state.params.shapes[LINE],
  rectParams: state.params.shapes[RECTANGLE],
  ellipseParams: state.params.shapes[ELLIPSE],
  polygonParams: state.params.shapes[POLYGON],

  isPreparingDownload: state.download.type === PREPARE_DOWNLOAD,
  isDownloadReady: state.download.type === READY_DOWNLOAD,
  downloadData: state.download.dataUrl,

  canUndo: state.shapes.drawn.length > 0,
  canRedo: state.shapes.popped.length > 0,
});

const mapDispatchToProps = dispatch => ({
  setParam: (key, value) => {
    dispatch(setParam(key, value));
  },

  setShapeParam: (shapeType, key, value) => {
    dispatch(setShapeParam(shapeType, key, value));
  },

  undo: () => {
    dispatch(undo());
  },

  redo: () => {
    dispatch(redo());
  },

  requestDownload: () => {
    dispatch(requestDownload());
  },

  finishDownload: () => {
    dispatch(finishDownload());
  }
});

const PaletteSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(PaletteSidebar);

export default PaletteSidebarContainer;
