import App from '../components/App';
import { connect } from 'react-redux';
import { updateWindowSize } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  hello: true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWindowSize: (width, height) => {
    dispatch(updateWindowSize(width, height))
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
