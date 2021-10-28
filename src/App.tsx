import React from 'react';
import './App.css';
import Board from "./components/Board/Board";
import {Grid} from "./features/Grid/Grid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board grid={new Grid(5, 7)} />
      </header>
    </div>
  );
}

export default App;
