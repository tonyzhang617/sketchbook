import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Shapes } from './utils.js';

const styles = {
  sidebar: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    float: 'left',
    backgroundColor: '#EF5350'
  },
  button: {
    display: 'block',
    margin: '8px',
  }
};

export default class Sidebar extends Component {
  render() {
    return (
      <div style={{
        ...styles.sidebar,
        width: this.props.width,
      }}>
        <RaisedButton
          label="Rectangle"
          onTouchTap={event => this.props.onShapeSelected(Shapes.rectangle)}
          style={styles.button}
        />
        <RaisedButton
          label="Ellipse"
          onTouchTap={event => this.props.onShapeSelected(Shapes.ellipse)}
          style={styles.button}
        />
        <RaisedButton
          label="Line"
          onTouchTap={event => this.props.onShapeSelected(Shapes.line)}
          style={styles.button}
        />
      </div>
    );
  }
}
