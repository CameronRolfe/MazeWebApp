
import {useEffect, useState} from "react"
export default function MazeGenerator({maze, cellSize, setMode}) {
    const numRows = maze.gridRows
    const numCols = maze.gridCols
    const [generating, setGenerating] = useState(true);
    
    const startCell = maze.startGridCell
    const [startRow, startCol] = startCell;
    const endCell = maze.endGridCell
    const [endRow, endCol] = endCell;

    const delay = 1;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const getCanvasCoords = (cell) => {
        const [row, col] = cell;
        const x = col * cellSize;
        const y = row * cellSize;
        return [x, y]
    }

    const drawCell = async (cell) => {
        const canvas = document.getElementById("mazeCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const [x, y] = getCanvasCoords(cell)
        ctx.fillStyle = "white";
        const [row, col] = cell
        if (row === startRow && col === startCol) ctx.fillStyle = "green"
        else if(row === endRow && col === endCol) ctx.fillStyle = "yellow"
        ctx.fillRect(x, y, cellSize, cellSize);
        await sleep(delay)
    }

    const drawMaze = async () => {
        const generationPath = maze.generationPath
        for (const cell of generationPath)  await drawCell(cell)
        setGenerating(false);
    }
    const canvasHeight = numRows * cellSize;
    const canvasWidth = numCols * cellSize

    useEffect(() => {
        drawMaze();
    }, []);

    return (
        <div className = "w-max mx-auto mt-5 mb-5">
            <button className={`flex mx-auto px-4 mt-5 mb-5 rounded-full text-white ${(generating) ? "bg-red-500" : "bg-blue-500"}`} onClick={() => setMode("image")}>{(generating) ? "Stop Generation" : "Show Maze Image"}</button>
            <canvas className="bg-black" id="mazeCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    );
}