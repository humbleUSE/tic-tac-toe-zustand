import {
  useGameStore,
  selectGameStatus,
  calculateTurns,
} from "@/store/useGameStore";
import type { GameBoard } from "@/types";
import Board from "./Board";
import Moves from "./Moves";
import Scoreboard from "./Scoreboard";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import * as m from "motion/react-client";

export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const recordWin = useGameStore((state) => state.recordWin);
  const recordDraw = useGameStore((state) => state.recordDraw);

  const { winner, isDraw } = useGameStore(useShallow(selectGameStatus));
  const currentSquares = history[currentMove];

  useEffect(() => {
    // Only record score when viewing the latest move and game is over
    if (currentMove === history.length - 1) {
      if (winner) {
        recordWin(winner);
      } else if (isDraw || calculateTurns(currentSquares)) {
        if (!winner && currentSquares.every(Boolean)) {
          recordDraw();
        }
      }
    }
  }, [
    winner,
    isDraw,
    currentMove,
    history.length,
    currentSquares,
    recordWin,
    recordDraw,
  ]);

  function handlePlay(nextSquares: GameBoard) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="flex flex-col items-center">
      <Scoreboard />
      <m.div
        id="game"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 sm:flex-row sm:items-start"
      >
        <Board squares={currentSquares} onPlay={handlePlay} />
        <Moves />
      </m.div>
    </div>
  );
}
