import { useGameStore } from "@/store/useGameStore";
import type { GameBoard } from "@/types";
import Board from "./Board";

export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: GameBoard) {
    setHistory(history.concat([nextSquares]));
    setXIsNext(!xIsNext)
  }

  return (
    <div className="flex">
      <Board squares={currentSquares} onPlay={handlePlay} />
      <aside>
        <ol>{/* TODO */}</ol>
      </aside>
    </div>
  );
}
