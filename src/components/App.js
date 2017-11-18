import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = () => (
  <div>
    <button onTouchTap={
      () => console.log("Hello world")
    }>
      Click me
    </button>
  </div>
);

export default App;
