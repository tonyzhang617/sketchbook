import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shapeToHTML } from '../helpers';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

class Canvas extends Component {
  componentDidMount() {
    let stage = this.stage.getStage();
    const { x, y }= ReactDOM.findDOMNode(this).getBoundingClientRect();

    const registerMouseMoveListener = () => {
      document.addEventListener('mousemove', onMouseMove);
    };

    const onStart = ({ evt }) => {
      this.props.onUpdateShape(evt.pageX - x, evt.pageY - y, {
        type: this.props.newShapeParams.type,
        color: this.props.newShapeParams.color,
        curved: (this.props.newShapeParams.options.curved ? true : false)
      });
      registerMouseMoveListener();
    };

    const onUpdate = ({ evt }) => {
      this.props.onUpdateShape(
        evt.pageX - x,
        evt.pageY - y,
        {
          append: (this.props.shouldLeftClickEndDrawing ? false : true)
        }
      );
    };

    const onMouseMove = ({ pageX, pageY }) => {
      this.props.onUpdateShape(
        pageX - x,
        pageY - y
      );
    };

    const unregisterMouseMoveListener = () => {
      document.removeEventListener('mousemove', onMouseMove);
    };

    const onFinish = ({ evt }) => {
      this.props.onEndShape(
        evt.pageX - x,
        evt.pageY - y,
        {
          append: (this.props.shouldLeftClickEndDrawing ? false : true)
        }
      );
      unregisterMouseMoveListener();
    };

    stage.on('contentClick', e => {
      if (e.evt.button === 0) {
        if (!this.props.isDrawing) {
          onStart(e);
        } else if (this.props.shouldLeftClickEndDrawing) {
          onFinish(e);
        } else {
          onUpdate(e);
        }
      } else if (e.evt.button === 2) {
        onFinish(e);
      }
    });

    if (!this.props.shouldLeftClickEndDrawing) {
      stage.on('contentDblclick', e => {
        console.log("double click");
        onFinish(e);
      });
    }
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
