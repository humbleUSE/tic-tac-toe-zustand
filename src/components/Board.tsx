import Square from "@/components/Square";
import { selectGameStatus, useGameStore } from "@/store/useGameStore";
import type { BoardProps, GameBoard } from "@/types";
import { useShallow } from "zustand/react/shallow";

export default function Board({ squares, onPlay }: BoardProps) {
  const { status, winner, player } = useGameStore(useShallow(selectGameStatus));
  function handleClick(clickedSquareIndex: number) {
    if (squares[clickedSquareIndex] || winner) return;

    const nextSquares = squares.slice() as GameBoard;
    nextSquares[clickedSquareIndex] = player;
    onPlay(nextSquares);
  }
  return (
    <div className="contents" id="game-board">
      <div className="text-muted-foreground select-none">{status}</div>
      <div
        id="board"
        className="grid aspect-square size-50 grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] place-items-center overflow-hidden rounded border-2 border-muted"
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
    </div>
  );
}
