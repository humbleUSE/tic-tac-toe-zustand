import type { Player, Squares } from "@/types";
import Square from "@/components/Square";
import { useGameStore } from "@/store/useGameStore";

export default function Board() {
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const player: Player = xIsNext ? "X" : "O";
  function handleClick(clickedSquareIndex: number) {
    if (squares[clickedSquareIndex]) return;

    const nextSquares = squares.slice();
    nextSquares[clickedSquareIndex] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // handle player turn
  }
  return (
    <div className="grid aspect-square size-50 grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] place-items-center overflow-hidden border border-gray-500">
      {squares.map((squareValue, squareIndex) => {
        return (
          <Square
            key={squareIndex}
            value={squareValue}
            onSquareClick={() => handleClick(squareIndex)}
          />
        );
      })}
    </div>
  );
}
