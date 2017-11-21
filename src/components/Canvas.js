import React, { Component } from 'react';
import { shapeToHTML } from '../helpers';
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

    const onMouseMove = ({ clientX, clientY }) => {
      this.props.onUpdateShape(
        this.props.newShapeParams.type,
        this.props.newShapeParams.color,
        clientX,
        clientY,
        0
      );
    };

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
        document.addEventListener('mousemove', onMouseMove);
      } else {
        // Unregister listener and end shape
        this.props.onEndShape(
          this.props.newShapeParams.type,
          this.props.newShapeParams.color,
          e.evt.offsetX,
          e.evt.offsetY,
          0
        );
        document.removeEventListener('mousemove', onMouseMove);
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
          <Layer>{
            this.props.shapes.map(shape => {
              return shapeToHTML(shape);
            })
          }</Layer>
          <Layer>{
            shapeToHTML(this.props.newShape)
          }</Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas;
