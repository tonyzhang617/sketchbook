import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

class Canvas extends Component {
  componentDidMount() {
    let stage = this.stage.getStage();

    // stage.on('contentMousedown', e => {
    //   this.props.onMouseDown(e);
    //   stage.on('contentMousemove', this.props.onMouseMove);
    // });
    // stage.on('contentMousemove', this.props.onMouseMove);
    // stage.on('contentMouseup', e => {
    //   this.props.onMouseUp(e);
    //   stage.off('contentMousemove');
    // });

    stage.on('contentClick', e => {
      if (!this.props.isDrawing) {
        // Register listener and start shape
        this.props.onUpdateShape(
          this.props.newShapeParams.type,
          this.props.newShapeParams.color,
          e.evt.offsetX,
          e.evt.offsetY,
          0
        );
        stage.on('contentMousemove', moveEvent => {
          this.props.onUpdateShape(
            this.props.newShapeParams.type,
            this.props.newShapeParams.color,
            moveEvent.evt.offsetX,
            moveEvent.evt.offsetY,
            0
          );
        });
      } else {
        // Unregister listener and end shape
        this.props.onEndShape(
          this.props.newShapeParams.type,
          this.props.newShapeParams.color,
          e.evt.offsetX,
          e.evt.offsetY,
          0
        );
        stage.off('contentMousemove');
      }
    });
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
  height: PropTypes.number.isRequired
}

export default Canvas;
