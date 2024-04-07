
import {useEffect, useState} from "react"
import MazeButton from "./MazeButton";
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
            <MazeButton primaryColour={(generating) ? "red-500" : "blue-500"} buttonText={(generating) ? "Stop Generation" : "Show Maze Image"} onClick={() => setMode("image")}></MazeButton>
            <canvas className="bg-black mt-5" id="mazeCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    );
}