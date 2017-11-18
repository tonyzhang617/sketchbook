import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

const Canvas = props => {
  <Stage
    ref='stage'
    width={ this.props.width }
    height={ this.props.height }>
    <Layer>
      { this.props.shapes }
    </Layer>
    <Layer>
      { this.props.newShape }
    </Layer>
  </Stage>
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shapes: PropTypes.arrayOf(PropTypes.object),
  newShape: PropTypes.object
}

export default Canvas;
