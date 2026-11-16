import Square from "@/components/Square";
import { selectGameStatus, useGameStore } from "@/store/useGameStore";
import { useShallow } from "zustand/react/shallow";

export default function Board() {
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const { status, winner, player } = useGameStore(useShallow(selectGameStatus));

  function handleClick(clickedSquareIndex: number) {
    if (squares[clickedSquareIndex] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[clickedSquareIndex] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // handle player turn
  }
  return (
    <main className="grid gap-3 place-items-center-safe">
      <div className="text-muted-foreground">{status}</div>
      <div
        id="board"
        className="grid rounded aspect-square size-50 grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] place-items-center overflow-hidden border-2 border-gray-500"
      >
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
    </main>
  );
}
