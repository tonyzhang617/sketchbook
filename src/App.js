import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      shapes: [],
      isMouseDown: false,
      newShapeParams: null,
      newShape: null,
    };
    this.onResize = this.onResize.bind(this);
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
    return (
      <Rect
        key={params.key}
        x={params.x}
        y={params.y}
        width={params.width}
        height={params.height}
        fill='green'
      />
    );
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

  componentDidMount() {
    var stage = this.refs.stage.getStage();

    stage.on('contentMousedown', ({evt}) => {
      var params = {
        key: this.state.shapes[this.state.shapes.length-1].key + 1,
        x: evt.clientX,
        y: evt.clientY,
        width: 1,
        height: 1,
      };

      this.setState({
        newShape: this.createNewShape(params),
        newShapeParams: params,
        isMouseDown: true,
      });
      console.log('Mouse Down');
    });
    stage.on('contentMousemove', ({evt}) => {
      if (this.state.isMouseDown) {
        var params = { ...this.state.newShapeParams };
        params.width = evt.clientX - params.x;
        params.height = evt.clientY - params.y;

        this.setState({
          newShape: this.createNewShape(params),
          newShapeParams: params,
        });

        console.log(evt.clientX, evt.clientY);
      }
    });
    stage.on('contentMouseup', ({evt}) => {
      var params = { ...this.state.newShapeParams };
      params.width = evt.clientX - params.x;
      params.height = evt.clientY - params.y;

      this.setState({
        newShape: null,
        newShapeParams: null,
        shapes: this.state.shapes.concat([this.createNewShape(params)]),
        isMouseDown: false,
      });
      console.log('Mouse Up');
    });
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
