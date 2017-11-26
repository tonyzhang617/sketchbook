import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shapeToHTML } from '../helpers';
import { DELETE_SHAPE, REMOVE_LAST_POINT } from '../enums';
import { Layer, Stage } from 'react-konva';

class Canvas extends Component {
  registerMouseMoveListener() {
    document.addEventListener('mousemove', this.onMouseMove, true);
  }

  unregisterMouseMoveListener() {
    document.removeEventListener('mousemove', this.onMouseMove, true);
  }

  onStart({ evt }) {
    this.props.onBeginShape(
      this.props.newShapeParams.type,
      evt.pageX-this.props.marginLeft, evt.pageY-this.props.marginTop,
      this.props.newShapeParams.color,
      {
        curved: this.props.newShapeParams.options.curved ? true : false,
        regular: this.props.isRegular
      }
    );
    this.registerMouseMoveListener();
  }

  onUpdate({ evt }) {
    this.props.onUpdateShape(
      evt.pageX - this.props.marginLeft,
      evt.pageY - this.props.marginTop,
      {
        append: (this.props.isContinuous ? true : false)
      }
    );
  }

  onMouseMove({ pageX, pageY }) {
    this.props.onUpdateShape(
      pageX - this.props.marginLeft,
      pageY - this.props.marginTop
    );
  }

  onFinish({ evt }) {
    this.props.onEndShape(
      evt.pageX - this.props.marginLeft,
      evt.pageY - this.props.marginTop,
      {
        append: (this.props.isContinuous ? true : false)
      }
    );
    this.unregisterMouseMoveListener();
  }

  onCancel(type) {
    this.props.onCancelShape(type);
    this.unregisterMouseMoveListener();
  }

  onKeyPress({ keyCode }) {
    switch (keyCode) {
      case 27:
        // Esc key
        this.onCancel(REMOVE_LAST_POINT);
        break;
      default:
        break;
    }
  }

  constructor(props) {
    super(props);

    this.registerMouseMoveListener = this.registerMouseMoveListener.bind(this);
    this.unregisterMouseMoveListener = this.unregisterMouseMoveListener.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.prepareDownload = this.prepareDownload.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress, false);

    let stage = this.stage.getStage();

    stage.on('contentClick', e => {
      if (e.evt.button === 0) {
        if (!this.props.isDrawing) {
          this.onStart(e);
        } else if (this.props.isContinuous) {
          this.onUpdate(e);
        } else {
          this.onFinish(e);
        }
      } else if (e.evt.button === 2) {
        this.onCancel(REMOVE_LAST_POINT);
      }
    });

    // stage.on('contentDblclick', e => {
    //   onFinish(e);
    // });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress, false);
  }

  prepareDownload() {
    let stage = this.stage.getStage();
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        let dataUrl = stage.toDataURL();
        resolve(dataUrl);
      }, 500);
    });
  }

  componentDidUpdate() {
    if (this.props.shouldPrepareDownload) {
      this.prepareDownload().then(dataUrl => {
        this.props.onDownloadReady(dataUrl);
      });
      this.props.onPreparingDownload();
    }
  }

  render() {
    return (
      <div
        id='canvas'
        style={{
          marginLeft: this.props.marginLeft
        }}
      >
        <Stage
          ref={( stage ) => { this.stage = stage; }}
          width={ this.props.width }
          height={ this.props.height }
        >
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
