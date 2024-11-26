// Helper function to shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Helper function to check if a number is valid in the current Sudoku board
const isValidNumber = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  // Check the 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
};

// Function to generate a puzzle with the correct number of filled cells
export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): number[][] => {
  // Start with an empty Sudoku board
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Number of cells to fill based on difficulty
  let numFilledCells: number;
  if (difficulty === 'easy') {
    numFilledCells = 81;  // Easy: 45 cells
  } else if (difficulty === 'medium') {
    numFilledCells = 35;  // Medium: 35 cells
  } else {
    numFilledCells = 25;  // Hard: 25 cells
  }

  // List of empty cell positions (row, col)
  const emptyCells: { row: number, col: number }[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      emptyCells.push({ row, col });
    }
  }

  // Shuffle empty cells to randomize placement
  shuffleArray(emptyCells);

  // Randomly assign numbers to the empty cells
  for (let i = 0; i < numFilledCells; i++) {
    const { row, col } = emptyCells[i];
    let numberAssigned = false;
    let attempts = 0;

    // Try to assign a valid number, retrying if needed
    while (!numberAssigned && attempts < 100) {
      const num = Math.floor(Math.random() * 9) + 1;  // Generate a random number between 1 and 9
      if (isValidNumber(board, row, col, num)) {
        board[row][col] = num;
        numberAssigned = true;
      }
      attempts++;
    }
  }

  return board;
};

// Helper function to check if a number can be placed at a given position
export const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check if the number exists in the current row or column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    
    // Check if the number exists in the 3x3 box
    const boxRowStart = 3 * Math.floor(row / 3);
    const boxColStart = 3 * Math.floor(col / 3);
    if (board[boxRowStart + Math.floor(i / 3)][boxColStart + (i % 3)] === num) return false;
  }
  return true;
};

// Function to solve the Sudoku puzzle using backtracking
export const solvePuzzle = (board: number[][]): number[][] => {
  // Solve using backtracking
  const solve = (board: number[][]): boolean => {
    // Find the next empty cell (0 means empty)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // Try numbers 1-9
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num; // Place the number
              if (solve(board)) return true; // Continue with the next empty cell
              board[row][col] = 0; // Backtrack if placing the number doesn't lead to a solution
            }
          }
          return false; // No valid number can be placed, backtrack
        }
      }
    }
    return true; // Puzzle is solved
  };

  const newBoard = [...board]; // Copy the board to avoid mutating the original
  solve(newBoard); // Call the solve function with the new board
  return newBoard; // Return the solved board
};


// Validate the current state of the board
export const validateBoard = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Skip empty cells (value = 0)
      if (board[row][col] !== 0 && !isValid(board, row, col, board[row][col])) {
        return false; // If an invalid number is found, return false
      }
    }
  }
  return true; // All numbers are valid
};
