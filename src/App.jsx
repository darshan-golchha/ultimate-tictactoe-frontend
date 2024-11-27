import { useState } from 'react';
import './App.css';
import SuperTicTacToe from './components/game';

function App() {
  const [count, setCount] = useState(0);

  return (
    <SuperTicTacToe />
  );
}

export default App;
