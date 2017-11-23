import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Layer, Stage, Rect, Ellipse, Line } from 'react-konva';

import Sidebar from './sidebar.js';
import { Shapes } from './utils.js';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      shapeType: Shapes.line,
      color: 'blue',
      shapes: [],
      isMouseDown: false,
      newShapeParams: null,
      newShape: null,
    };
    this.onResize = this.onResize.bind(this);
    this.onShapeSelected = this.onShapeSelected.bind(this);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  onResize() {
    this.setState({
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });
  }

  onShapeSelected(shape) {
    if (shape !== this.state.shapeType) {
      this.setState({
        shapeType: shape,
      });
    }
  }

  onColorSelected(color) {
    if (this.state.color !== color) {
      this.setState({
        color: color
      });
    }
  }

  onUndo() {
    if (this.state.shapes.length > 0) {
      this.setState(prevState => {
        prevState.shapes.pop();
        return prevState.shapes;
      });
    }
  }

  createNewShape(params) {
    if (params.type === Shapes.rectangle) {
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
    } else if (params.type === Shapes.ellipse) {
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
    } else if (params.type === Shapes.line) {
      return (
        <Line
          key={params.key}
          x={params.startX}
          y={params.startY}
          points={[0, 0, params.endX-params.startX, params.endY-params.startY]}
          stroke={params.fill}
          strokeWidth={3}
        />
      );
    } else {
      return null;
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onMouseDown({ evt }) {
    var params = {
      // TODO: use unique IDs
      key: (this.state.shapes[this.state.shapes.length-1] != null) ? (parseInt(this.state.shapes[this.state.shapes.length-1].key, 10) + 1) : 0,
      type: this.state.shapeType,
      startX: evt.offsetX,
      startY: evt.offsetY,
      endX: evt.offsetX,
      endY: evt.offsetY,
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
      params.endX = evt.offsetX;
      params.endY = evt.offsetY;

      this.setState({
        newShape: this.createNewShape(params),
        newShapeParams: params,
      });

      console.log(params.endX, params.endY);
    }
  }

  onMouseUp({ evt }) {
    var params = { ...this.state.newShapeParams };
    params.endX = evt.offsetX;
    params.endY = evt.offsetY;

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
    const sidebarWidth = 360;

    return (
      <div style={{
        position: 'relative',
      }}>
        <Sidebar
          width={sidebarWidth}
          onShapeSelected={this.onShapeSelected}
          onColorSelected={this.onColorSelected}
          onUndo={this.onUndo}
        />

        <div style={{
          marginLeft: sidebarWidth,
        }}>
          <Stage ref='stage'
            width={this.state.windowDimensions.width - sidebarWidth}
            height={this.state.windowDimensions.height}>
            <Layer>
              { this.state.shapes }
            </Layer>
            <Layer>
              { this.state.newShape }
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
