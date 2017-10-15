import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Shapes } from './utils.js';

export default class Sidebar extends Component {
  render() {
    return (
      <div style={{
        width: this.props.width,
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        float: 'left',
        backgroundColor: 'lightblue',
      }}>
        <RaisedButton
          label="Rectangle"
          onTouchTap={event => this.props.onShapeSelected(Shapes.rectangle)}
        />
        <RaisedButton
          label="Ellipse"
          onTouchTap={event => this.props.onShapeSelected(Shapes.ellipse)}
        />
        <RaisedButton
          label="Line"
          onTouchTap={event => this.props.onShapeSelected(Shapes.line)}
        />
      </div>
    );
  }
}
