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

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <p>
                    Conway&apos;s Game of Life is a cellular automaton. It uses a grid of cells,
                    where each cell is either alive or dead.
                </p>
                <p>
                    The next state of each cell is determined by a few simple rules:
                </p>
                <ul>
                    <li>Any live cell with fewer than 2 live neighbors dies.</li>
                    <li>Any live cell with 2 or 3 live neighbors lives on.</li>
                    <li>Any live cell with more than 3 live neighbors dies.</li>
                    <li>Any dead cell with exactly 3 live neighbors becomes a live cell.</li>
                </ul>
                <p>
                    When the game is paused, click a cell to toggle its state.
                </p>
            </div>
            <div>
                <div className={styles.controls}>
                    <button onClick={handleStartStop}>
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
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
                </div></div>

        </div>
    );
};

export default Conway;
