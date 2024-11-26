# Sudoku Game

A web-based Sudoku game built with React and TypeScript. The game features:
- Dynamic puzzle generation based on difficulty (easy, medium, hard).
- Puzzle-solving functionality with backtracking algorithm.
- Real-time validation to check if the puzzle is solved correctly.
- Stopwatch feature to track time spent on the puzzle.
- Responsive design optimized for various screen sizes.

## Features:
- Puzzle generation
- Difficulty levels (easy, medium, hard)
- Solve button
- Validate solution

## How to Run the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/FarajMe/sudoku-game.git
npm install
npm start


#### **c. Approach**

Describe your approach to building the game:

```markdown
## Approach

1. **UI Design**: The UI is built using React components. The main components include the `Board`, `Cell`, and `StopwatchButton`. I used CSS Grid for the board layout and flexbox for responsive button positioning.

2. **Sudoku Logic**: I implemented a backtracking algorithm to solve the Sudoku puzzle. The puzzle generation logic ensures valid solutions and adjusts the number of pre-filled cells based on difficulty.

3. **State Management**: The application uses React's `useState` to manage the board state, difficulty level, and solved status.

4. **Challenges**: 
   - Handling the board's dynamic state while ensuring updates are done efficiently was a challenge.
   - Ensuring the Sudoku validation checks were implemented correctly, especially when managing both row, column, and 3x3 grid constraints.

5. **Solutions**: 
   - I used a function to check Sudoku rules (validating rows, columns, and subgrids) for user inputs.
   - Optimized the board rendering with React's state and rerendering lifecycle to avoid unnecessary re-renders.


## Challenges and Solutions

1. **Handling Puzzle Validation**: One challenge was implementing an efficient Sudoku validation function that ensures all constraints are met. I tackled this by breaking the validation into smaller helper functions that check rows, columns, and 3x3 grids.

2. **State Updates with React**: Managing the board state with React's `useState` hook and ensuring efficient updates when cells change was tricky. To solve this, I made use of immutable data structures (by cloning arrays) to avoid direct mutation of state.

3. **Difficulty Adjustment**: Implementing the logic for generating puzzles with different difficulty levels required adjusting the number of pre-filled cells. I used a function to handle this dynamically based on the selected difficulty.
