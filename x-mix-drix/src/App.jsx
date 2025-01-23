import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null); 

  const handleCellClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else if (!newBoard.includes(null)) {
      setWinner("tie");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6], 
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; 
      }
    }
    return null; 
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>X Mix Drix</h1>
      <div className="board">
        {board.map((value, index) => (
          <div className="cell" key={index} onClick={() => handleCellClick(index)}>
            {value && (
              <img
                src={
                  value === "X"
                    ? "/images/x.png"
                    : "/images/o.png"
                }
                alt={value}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* tie*/}
      {winner && (
        <div className="winner-message">
          {winner === "tie" ? (
            <p>It is a Tie!</p>
          ) : (
            <p>The Winner is {winner}!</p>
          )}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
