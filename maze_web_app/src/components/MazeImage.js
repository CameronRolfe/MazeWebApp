export default function MazeImage({mazeImageStr}) {
    return (
        <img className="m-auto mt-5" src = {mazeImageStr} alt="maze"></img>
    );
}