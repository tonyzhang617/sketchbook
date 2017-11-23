import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shapeToHTML } from '../helpers';
import { DELETE_SHAPE, REMOVE_LAST_POINT } from '../enums';
import { Layer, Stage } from 'react-konva';

class Canvas extends Component {
  componentDidMount() {
    let stage = this.stage.getStage();
    const { x, y }= ReactDOM.findDOMNode(this).getBoundingClientRect();

    const registerMouseMoveListener = () => {
      document.addEventListener('mousemove', onMouseMove);
    };

    const unregisterMouseMoveListener = () => {
      document.removeEventListener('mousemove', onMouseMove);
    };

    const onStart = ({ evt }) => {
      this.props.onBeginShape(
        this.props.newShapeParams.type,
        evt.pageX-x, evt.pageY-y,
        this.props.newShapeParams.color,
        this.props.newShapeParams.options.curved ? { curved: true } : null
      );
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

    const onCancel = type => {
      this.props.onCancelShape(type);
      unregisterMouseMoveListener();
    };

    stage.on('contentClick', e => {
      if (e.evt.button === 0) {
        if (!this.props.isDrawing) {
          onStart(e);
        } else if (!this.props.shouldLeftClickEndDrawing) {
          onUpdate(e);
        } else {
          onFinish(e);
        }
      } else if (e.evt.button === 2) {
        onCancel(REMOVE_LAST_POINT);
      }
    });

    stage.on('contentDblclick', e => {
      onFinish(e);
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
