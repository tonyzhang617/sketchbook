import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      isMouseDown: false,
    };
  }

  componentWillMount() {
    var newShapes = [(<Rect x={10} y={10} width={50} height={50} fill='blue' onDragStart={event => console.log(event)} draggable='true'/>)];
    this.setState({
      shapes: newShapes,
    });
  }

  componentDidMount() {
    var stage = this.refs.stage.getStage();
    
    stage.on('contentMousedown', ({evt}) => {
      this.setState({
        isMouseDown: true,
      });
      console.log('Mouse Down');
    });
    stage.on('contentMouseup', ({evt}) => {
      this.setState({
        isMouseDown: false,
      });
      console.log('Mouse Up');
    });
    stage.on('contentMousemove', ({evt}) => {
      if (this.state.isMouseDown) {
        console.log(evt.clientX, evt.clientY);
      }
    });
  }

  render() {
    var stage = (
      <Stage ref='stage' width={800} height={800}>
        <Layer>
          {this.state.shapes}
        </Layer>
      </Stage>
    );

    return stage;
  }
}

export default App;
