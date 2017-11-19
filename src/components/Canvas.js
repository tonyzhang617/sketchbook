import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

class Canvas extends Component {
  componentDidMount() {
    let stage = this.stage.getStage();

    stage.on('contentMousedown', this.props.onMouseDown);
    stage.on('contentMousemove', this.props.onMouseMove);
    stage.on('contentMouseup', this.props.onMouseUp);
  }

  render() {
    return (
      <div>
        <Stage
          ref={( stage ) => { this.stage = stage; }}
          width={ this.props.width }
          height={ this.props.height }>
          <Layer>
          </Layer>
          <Layer>
          </Layer>
        </Stage>
      </div>
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shapes: PropTypes.arrayOf(PropTypes.object),
  newShape: PropTypes.object
}

export default Canvas;
