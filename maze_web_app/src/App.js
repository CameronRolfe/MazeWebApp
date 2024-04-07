import './App.css';
import {useEffect, useState} from "react"
import MazeImage from './components/MazeImage';
import MazeGenerator from './components/MazeGenerator';
import MazeButton from './components/MazeButton';
const Maze = require("camsmazes");

function App() {
  const [maze, setMaze] = useState(new Maze(40, 40))
  const [mode, setMode] = useState("image")
  const [showSolution, setShowSolution] = useState(false);

  const [numRows, setNumRows] = useState(40)
  const [numCols, setNumCols] = useState(40)
  const [startRow, setStartRow] = useState(0)
  const [startCol, setStartCol] = useState(0)
  const [endRow, setEndRow] = useState("")
  const [endCol, setEndCol] = useState("")
  const settings = [
      {id: "numRows", text: "Rows", setter: setNumRows, value: numRows, range: [10, 100]},
      {id: "numCols", text: "Columns", setter: setNumCols, value: numCols, range: [10, 100]},
      {id: "startRow", text: "Start Row", setter: setStartRow, value: startRow, range: [0, numRows-1]},
      {id: "startCol", text: "Start Col", setter: setStartCol, value: startCol, range: [0, numCols-1]},
      {id: "endRow", text: "End Row", setter: setEndRow, value: endRow, range: [0, numRows-1]},
      {id: "endCol", text: "End Col", setter: setEndCol, value: endCol, range: [0, numCols-1]},
  ]
  
  const settingsHTML = settings.map(setting => 
      <div key={setting.id}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={setting.id}>{setting.text}</label>
          <input 
            id = {setting.id} 
            className="text-center w-12 border-2 valid:border-blue-500 invalid:border-red-500 focus:border-black rounded outline-none" 
            type="number" value={setting.value} 
            min = {setting.range[0]} 
            max = {setting.range[1]} 
            onChange={(e) => setting.setter(e.target.value)}>
          </input>
      </div>
  )

  const generateMaze = () => {
    if (numRows < 10 || numRows > 200) return;
    if (numCols < 10 || numCols > 200) return;
    if (startRow < 0 || startRow >= numRows) return;
    if (startCol < 0 || startCol >= numCols) return;
    if (endRow < 0 || endRow >= numRows) return;
    if (endCol < 0 || endCol >= numCols) return;

    const maze = new Maze(numRows, numCols, startRow, startCol, endCol, endRow)
    setMaze(maze)
    setShowSolution(false)
  }

  const getScreenSize = () => {
    const width = window.innerWidth
    if (width <= 500) return "s";
    else if(width > 500 && width < 1500) return "m";
    else return "l";
  }

  const cellSizeMap = {"s": 5, "m": 8, "l": 10}
  const [screenSize, setScreensize] = useState(getScreenSize())
  const cellSize = cellSizeMap[screenSize]

  useEffect(() => {
    const handleResize = () => {
      const newScreenSize = getScreenSize();
      console.log("screenSize", newScreenSize)
      if (newScreenSize !== screenSize) {
        setScreensize(newScreenSize);
      } 
    }
     
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
     };
  }, [])
  return (
    <div className="App">
        <div className="m-auto grid grid-cols-2 w-1/2 max-w-40 ">
            {settingsHTML}
        </div>
        {(mode === "image") ? <MazeButton primaryColour={"blue-500"} buttonText={"Generate Maze"} onClick={() => generateMaze()}/> : null}
        {(mode === "image") ? <MazeButton primaryColour={"blue-500"} buttonText={"Show Generation"} onClick={() => setMode("generation")}/> : null}
        {(mode === "image") ? <MazeButton primaryColour={"blue-500"} buttonText={(showSolution) ? "Hide Solution" : "Show Solution"} onClick={() => setShowSolution(!showSolution)}/> : null}
        {(mode==="image") ? <MazeImage mazeImageStr={maze.getImageBase64(cellSize, showSolution)}/> : null}
        {(mode==="generation") ? <MazeGenerator maze={maze} cellSize={cellSize} setMode={setMode}/> : null}
    </div>
    
  );
}

export default App;