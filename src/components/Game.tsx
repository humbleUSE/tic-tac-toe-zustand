import { useGameStore } from "@/store/useGameStore";
import type { GameBoard } from "@/types";
import Board from "./Board";

export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const xIsNext = currentMove % 2 == 0;
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: GameBoard) {
    const nextHistory = history
      .splice(0, currentMove + 1)
      .concat([nextSquares]);
    setHistory(nextHistory); // Append latest game play to history
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(currentMove % 2 === 0);
  }
  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <aside
        id="game-moves"
        className="max-h-50 min-h-full scrollbar-thin scrollbar-thumb-muted justify-end-safe place-self-center overflow-y-scroll scroll-smooth rounded border py-2 pl-2 sm:place-self-end"
      >
        <ol className="flex flex-col-reverse gap-2" id="move-list">
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : `Go to game start`;

            return (
              <li key={historyIndex}>
                <button
                  type="button"
                  onClick={() => jumpTo(historyIndex)}
                  className="btn w-full rounded px-2.5 py-2 text-muted-foreground"
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
      <main className="grid grid-rows-[repeat(2,min-content)] place-content-center items-end-safe justify-items-center gap-3">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </main>
    </div>
  );
}
