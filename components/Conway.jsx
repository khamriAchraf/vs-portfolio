import React, { useState, useEffect } from 'react';
import styles from '@/styles/Conway.module.css';

const rows = 30;
const cols = 30;

const createEmptyGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array(cols).fill(false));
  }
  return grid;
};

// Define custom patterns as arrays of cell coordinates.
const patterns = {
  Glider: [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  Blinker: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  'Lightweight Spaceship': [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [0, 1],
    [4, 1],
    [4, 2],
    [0, 3],
    [3, 3],
  ],
  Toad: [
    [1, 2], [1, 3], [1, 4],
    [2, 1], [2, 2], [2, 3],
  ],
  Beacon: [
    [0, 0], [0, 1], [1, 0], [1, 1],
    [2, 2], [2, 3], [3, 2], [3, 3],
  ],
  Pulsar: [
    // Coordinates after subtracting 2 from the classic pulsar pattern.
    [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
    [2, 0], [2, 5], [2, 7], [2, 12],
    [3, 0], [3, 5], [3, 7], [3, 12],
    [4, 0], [4, 5], [4, 7], [4, 12],
    [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
    [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
    [8, 0], [8, 5], [8, 7], [8, 12],
    [9, 0], [9, 5], [9, 7], [9, 12],
    [10, 0], [10, 5], [10, 7], [10, 12],
    [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10],
  ],
  Diehard: [
    [0, 6],
    [1, 0], [1, 1],
    [2, 1],
    [2, 5], [2, 6], [2, 7],
  ],
  Acorn: [
    [0, 1],
    [1, 3],
    [2, 0], [2, 1], [2, 4], [2, 5], [2, 6],
  ],
};

// Component to display a small preview grid for a pattern.
const PatternPreview = ({ patternName, patternCells, onClick }) => {
  const previewRows = 7;
  const previewCols = 7;
  // Create an empty preview grid.
  const previewGrid = Array.from({ length: previewRows }, () =>
    Array(previewCols).fill(false)
  );

  // Compute the bounding box of the pattern.
  let minRow = Infinity,
    maxRow = -Infinity,
    minCol = Infinity,
    maxCol = -Infinity;
  patternCells.forEach(([r, c]) => {
    if (r < minRow) minRow = r;
    if (r > maxRow) maxRow = r;
    if (c < minCol) minCol = c;
    if (c > maxCol) maxCol = c;
  });
  const patternHeight = maxRow - minRow + 1;
  const patternWidth = maxCol - minCol + 1;
  const patternCenterRow = minRow + Math.floor(patternHeight / 2);
  const patternCenterCol = minCol + Math.floor(patternWidth / 2);

  // Compute the center of the preview grid.
  const previewCenterRow = Math.floor(previewRows / 2);
  const previewCenterCol = Math.floor(previewCols / 2);
  const offsetRow = previewCenterRow - patternCenterRow;
  const offsetCol = previewCenterCol - patternCenterCol;

  // Place the pattern cells into the preview grid.
  patternCells.forEach(([r, c]) => {
    const newRow = r + offsetRow;
    const newCol = c + offsetCol;
    if (newRow >= 0 && newRow < previewRows && newCol >= 0 && newCol < previewCols) {
      previewGrid[newRow][newCol] = true;
    }
  });

  return (
    <div className={styles.previewWrapper} onClick={onClick}>
      <div
        className={styles.previewGrid}
        style={{ gridTemplateColumns: `repeat(${previewCols}, 10px)` }}
      >
        {previewGrid.flat().map((cell, idx) => (
          <div
            key={idx}
            className={`${styles.previewCell} ${cell ? styles.previewAlive : ''}`}
          />
        ))}
      </div>
      <div className={styles.previewLabel}>{patternName}</div>
    </div>
  );
};

const Conway = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [isRunning, setIsRunning] = useState(false);

  // Compute the next generation.
  const runIteration = () => {
    setGrid(g => {
      const newGrid = g.map(row => [...row]);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let neighbors = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
                if (g[newI][newJ]) neighbors++;
              }
            }
          }
          if (g[i][j] && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = false;
          }
          if (!g[i][j] && neighbors === 3) {
            newGrid[i][j] = true;
          }
        }
      }
      return newGrid;
    });
  };

  // Run game loop when running.
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(runIteration, 500);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Toggle cell state when game is paused.
  const toggleCell = (row, col) => {
    if (isRunning) return;
    setGrid(g => {
      const newGrid = g.map(r => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset the grid to an empty state.
  const handleReset = () => {
    setIsRunning(false);
    setGrid(createEmptyGrid());
  };

  // Load a custom pattern centered on the board.
  const loadPattern = (patternName) => {
    if (isRunning) return;
    const newGrid = createEmptyGrid();
    const patternCells = patterns[patternName];

    // Compute pattern bounding box.
    let minRow = Infinity,
      maxRow = -Infinity,
      minCol = Infinity,
      maxCol = -Infinity;
    patternCells.forEach(([r, c]) => {
      if (r < minRow) minRow = r;
      if (r > maxRow) maxRow = r;
      if (c < minCol) minCol = c;
      if (c > maxCol) maxCol = c;
    });
    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;
    const patternCenterRow = minRow + Math.floor(patternHeight / 2);
    const patternCenterCol = minCol + Math.floor(patternWidth / 2);

    // Compute board center.
    const boardCenterRow = Math.floor(rows / 2);
    const boardCenterCol = Math.floor(cols / 2);

    // Compute offset.
    const offsetRow = boardCenterRow - patternCenterRow;
    const offsetCol = boardCenterCol - patternCenterCol;

    // Place pattern cells into the grid.
    patternCells.forEach(([r, c]) => {
      const newRow = r + offsetRow;
      const newCol = c + offsetCol;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        newGrid[newRow][newCol] = true;
      }
    });
    setGrid(newGrid);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>
          Conway&apos;s Game of Life is a cellular automaton. It uses a grid of cells,
          where each cell is either alive or dead.
        </p>
        <p>The next state of each cell is determined by a few simple rules:</p>
        <ul>
          <li>Any live cell with fewer than 2 live neighbors dies.</li>
          <li>Any live cell with 2 or 3 live neighbors lives on.</li>
          <li>Any live cell with more than 3 live neighbors dies.</li>
          <li>Any dead cell with exactly 3 live neighbors becomes a live cell.</li>
        </ul>
        <p>When the game is paused, click a cell to toggle its state.</p>
        <div className={styles.patterns}>
          <p>Load a custom pattern:</p>
          <div className={styles.previewContainer}>
            {Object.entries(patterns).map(([name, cells]) => (
              <PatternPreview
                key={name}
                patternName={name}
                patternCells={cells}
                onClick={() => loadPattern(name)}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.controls}>
          <button onClick={handleStartStop}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          {!isRunning && <button onClick={runIteration}>Next</button>}
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.gameContainer}>
          <div className={styles.grid}>
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`${styles.cell} ${cell ? styles.alive : ''}`}
                  onClick={() => toggleCell(i, j)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conway;
