import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { Layer, Stage, Rect, Ellipse, Line } from 'react-konva';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      shapeType: 'line',
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
    } else if (params.type === 'line') {
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
        <div style={{
          width: sidebarWidth,
          height: this.state.windowDimensions.height,
          position: 'absolute',
          top: 0,
          left: 0,
          float: 'left',
          backgroundColor: 'lightblue',
        }}>
          <RaisedButton label="Hello world" />
        </div>

        <div style={{
          marginLeft: sidebarWidth,
        }}>
          <Stage ref='stage'
            width={this.state.windowDimensions.width - sidebarWidth}
            height={this.state.windowDimensions.height}>
            <Layer>
              { this.state.shapes }
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
