import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { generatePuzzle, solvePuzzle, validateBoard } from './utils/sudoku';
import StopwatchButton from './components/StopwatchButton';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [board, setBoard] = useState(generatePuzzle('easy'));  // Initial board for easy difficulty
  const [solved, setSolved] = useState(false);

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setBoard(generatePuzzle(newDifficulty));  // Regenerate the puzzle with new difficulty
    setSolved(false);  // Reset the solved state
  };

  const handleSolve = () => {
    const solvedBoard = solvePuzzle(board); // Get the fully solved board
    if (!solvedBoard) {
      alert('Unable to solve the puzzle.');
      return;
    }
    
    // Fill only the empty cells (0 values) with the solution
    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 0 ? solvedBoard[rowIndex][colIndex] : cell))
    );
    
    setBoard(newBoard); // Update the board
    setSolved(true); // Mark as solved
  };
  

  const handleCheck = () => {
    const isValid = validateBoard(board);
    if (!isValid) {
      alert('There are conflicts in the board!');
    } else {
      alert('The board is valid!');
    }
  };

  const handleChange = (row: number, col: number, value: number) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard); // Update the board with the new value
  };

  return (
    <div className="App">
      <div className="eventsDiv">
        <h1>Sudoku Game</h1>
        <div className="difficulty-level">
          <span>Difficulty:</span>
          <a onClick={() => handleDifficultyChange('easy')} className="difficulty-link link1">Easy</a>
          <a onClick={() => handleDifficultyChange('medium')} className="difficulty-link link2">Medium</a>
          <a onClick={() => handleDifficultyChange('hard')} className="difficulty-link link3">Hard</a>
        </div>

        <div className="Btns">
          <button className="btn">Hint: 3</button>
          <StopwatchButton />
          <button onClick={handleSolve} className="btn">Solve</button>
          <button className="btn">Upload</button>
        </div>
        <button onClick={handleCheck} className="BtnBottom">Check Solution</button>
      </div>

      <Board board={board} setBoard={handleChange} />

    </div>
  );
};

export default App;
