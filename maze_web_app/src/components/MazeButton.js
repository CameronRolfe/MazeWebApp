export default function MazeButton({buttonText, onClick, primaryColour}) {
    
    return (
        <button 
            className= {`block w-40 h-8 mx-auto mt-5 rounded text-${primaryColour} border-solid border-2 border-${primaryColour} bg-white text-center hover:bg-${primaryColour} hover:text-white font-sans font-semibold`} 
            onClick={onClick}
        >
        {buttonText}
        </button>
    );
}