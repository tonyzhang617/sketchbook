import React, { Component } from 'react';
import { Layer, Stage, Rect, Ellipse } from 'react-konva';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      shapeType: 'ellipse',
      color: 'blue',
      shapes: [],
      isMouseDown: false,
      newShapeParams: null,
      newShape: null,
    };
    this.onResize = this.onResize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onResize() {
    this.setState({
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  }

  createNewShape(params) {
    if (params.type === 'rectangle') {
      return (
        <Rect
          key={params.key}
          x={params.startX}
          y={params.startY}
          width={params.endX - params.startX}
          height={params.endY - params.startY}
          fill={params.fill}
        />
      );
    } else if (params.type === 'ellipse') {
      return (
        <Ellipse
          key={params.key}
          x={params.startX}
          y={params.startY}
          radius={{
            x: Math.abs(params.endX - params.startX),
            y: Math.abs(params.endY - params.startY),
          }}
          fill={params.fill}
        />
      );
    } else {
      return null;
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize);

    var newShapes = [
      <Rect x={10} y={10} key={0}
        width={50} height={50}
        fill='blue' />
    ];
    this.setState({
      shapes: newShapes,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onMouseDown({ evt }) {
    var params = {
      key: parseInt(this.state.shapes[this.state.shapes.length-1].key) + 1,
      type: this.state.shapeType,
      startX: evt.clientX,
      startY: evt.clientY,
      endX: evt.clientX,
      endY: evt.clientY,
      fill: this.state.color,
    };

    this.setState({
      newShape: this.createNewShape(params),
      newShapeParams: params,
      isMouseDown: true,
    });
    console.log('Mouse Down');
  }

  onMouseMove({ evt }) {
    if (this.state.isMouseDown) {
      var params = { ...this.state.newShapeParams };
      params.endX = evt.clientX;
      params.endY = evt.clientY;

      this.setState({
        newShape: this.createNewShape(params),
        newShapeParams: params,
      });

      console.log(evt.clientX, evt.clientY);
    }
  }

  onMouseUp({ evt }) {
    var params = { ...this.state.newShapeParams };
    params.endX = evt.clientX;
    params.endY = evt.clientY;

    this.setState({
      newShape: null,
      newShapeParams: null,
      shapes: this.state.shapes.concat([this.createNewShape(params)]),
      isMouseDown: false,
    });
    console.log('Mouse Up');
  }

  componentDidMount() {
    var stage = this.refs.stage.getStage();

    stage.on('contentMousedown', this.onMouseDown);
    stage.on('contentMousemove', this.onMouseMove);
    stage.on('contentMouseup', this.onMouseUp);
  }

  render() {
    var stage = (
      <Stage ref='stage' width={this.state.windowDimensions.width} height={this.state.windowDimensions.height}>
        <Layer>
          { this.state.shapes }
          { this.state.newShape }
        </Layer>
      </Stage>
    );

    return stage;
  }
}

export default App;
