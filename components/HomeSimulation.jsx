import React, { useState, useEffect } from 'react';
import styles from '@/styles/HomeSimulation.module.css';

const rows = 15;
const cols = 15;

const createEmptyGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array(cols).fill(false));
  }
  return grid;
};

const pulsarPattern = [
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
];

const HomeSimulation = () => {
  const [grid, setGrid] = useState(createEmptyGrid());

  // Compute next generation.
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

  // Load pulsar pattern centered on the board.
  const loadPulsar = () => {
    const newGrid = createEmptyGrid();

    // Compute pattern bounding box.
    let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;
    pulsarPattern.forEach(([r, c]) => {
      minRow = Math.min(minRow, r);
      maxRow = Math.max(maxRow, r);
      minCol = Math.min(minCol, c);
      maxCol = Math.max(maxCol, c);
    });
    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;
    const patternCenterRow = minRow + Math.floor(patternHeight / 2);
    const patternCenterCol = minCol + Math.floor(patternWidth / 2);

    // Compute board center.
    const boardCenterRow = Math.floor(rows / 2);
    const boardCenterCol = Math.floor(cols / 2);
    const offsetRow = boardCenterRow - patternCenterRow;
    const offsetCol = boardCenterCol - patternCenterCol;

    pulsarPattern.forEach(([r, c]) => {
      const newRow = r + offsetRow;
      const newCol = c + offsetCol;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        newGrid[newRow][newCol] = true;
      }
    });
    setGrid(newGrid);
  };

  // Auto-start simulation with pulsar.
  useEffect(() => {
    loadPulsar();
    const interval = setInterval(runIteration, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.simulationContainer}>
      <div className={styles.grid}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`${styles.cell} ${cell ? styles.alive : ''}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeSimulation;
