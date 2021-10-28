import React from 'react';
import './App.css';
import Board from "./components/Board/Board";
import {Grid} from "./features/Grid/Grid";
import {Point} from "./features/Point";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board grid={new Grid(5, 7, [ new Point(1, 3) ])} />
      </header>
    </div>
  );
}

export default App;
