import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
    };
  }

  componentWillMount() {
    var newShapes = [(<Rect x={10} y={10} width={50} height={50} fill='blue' onDragStart={event => console.log(event)} draggable='true'/>)];
    this.setState({
      shapes: newShapes,
    });
  }

  render() {
    var stage = (
      <Stage width={800} height={800}>
        <Layer>
          {this.state.shapes}
        </Layer>
      </Stage>
    );

    return stage;
  }
}

export default App;
