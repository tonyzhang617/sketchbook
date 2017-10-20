import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Brush from 'material-ui/svg-icons/image/brush';

import { Shapes } from './utils.js';

const styles = {
  sidebar: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    float: 'left'
    // backgroundColor: '#EF5350'
  },
  button: {
    display: 'block',
    margin: '8px',
  }
};

export default class Sidebar extends Component {
  render() {
    const colors = ['black', 'green', 'red', 'yellow', 'blue', 'purple', 'pink', 'orange', 'lightcyan', 'violet', 'teal', 'magenta', 'lightseagreen', 'indianred'];
    return (
      <Paper
        zDepth={3}
        style={{
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
        <RaisedButton
          label="Undo"
          onTouchTap={event => this.props.onUndo()}
          style={styles.button}
        />
        <Divider />
        {
          colors.map(color => {
            return (
              <IconButton
                onTouchTap={event => this.props.onColorSelected(color) }
                tooltip={color}
                iconStyle={{
                  color: color
                }}>
                <Brush />
              </IconButton>
            );
          })
        }
      </Paper>
    );
  }
}
