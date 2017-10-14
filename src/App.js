import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';

class App extends Component {
  render() {
    return (
      <Stage width={800} height={800}>
        <Layer>
          <Rect x={10} y={10} width={50} height={50} fill='blue' />
        </Layer>
      </Stage>
    );
  }
}

export default App;
