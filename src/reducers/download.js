import { REQUEST_DOWNLOAD, PREPARE_DOWNLOAD, READY_DOWNLOAD, FINISH_DOWNLOAD } from '../actions';

const download = (state = { type: null, dataUrl: null }, action) => {
  switch (action.type) {
    case REQUEST_DOWNLOAD:
    case PREPARE_DOWNLOAD:
      return Object.assign({}, state, { type: action.type });
    case READY_DOWNLOAD:
      return Object.assign({}, state, {
        type: READY_DOWNLOAD,
        dataUrl: action.dataUrl
      });
    case FINISH_DOWNLOAD:
      return {
        type: null,
        dataUrl: null
      };
    default:
      return state;
  }
};

export default download;
