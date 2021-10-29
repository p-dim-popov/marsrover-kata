import React from 'react';
import './App.css';
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board grid={{ rows: 5, cols: 7, obstacles: [{x: 1, y: 3}] }} />
      </header>
    </div>
  );
}

export default App;
