import React, { Component } from 'react';
import CanvasContainer from '../containers/Canvas';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);

    this.onResize();
  }

  onResize() {
    this.props.updateWindowSize(window.innerWidth, window.innerHeight);
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return (
      <div>
        <CanvasContainer />
      </div>
    );
  }
}

export default App;
