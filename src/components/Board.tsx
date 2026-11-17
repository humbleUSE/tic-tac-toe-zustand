import { useEffect } from "react";
import confetti from "canvas-confetti";
import Square from "@/components/Square";
import { selectGameStatus, useGameStore } from "@/store/useGameStore";
import type { BoardProps, GameBoard } from "@/types";
import { useShallow } from "zustand/react/shallow";
import * as m from "motion/react-client";

// Parent container variants for staggered children squares
const boardContainerVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const squareItemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
    },
  },
};

export default function Board({ squares, onPlay }: BoardProps) {
  const { status, winner, player, isDraw, winningSquares } = useGameStore(
    useShallow(selectGameStatus),
  );

  useEffect(() => {
    if (!winner) return;

    // First burst: Center pop
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors:
        winner === "X"
          ? ["#38bdf8", "#0284c7", "#e0f2fe"]
          : ["#fbbf24", "#d97706", "#fef3c7"],
    });

    // Secondary burst: Side cannons for a celebratory feel
    const timer = setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [winner]);

  function handleClick(clickedSquareIndex: number) {
    if (squares[clickedSquareIndex] || winner) return;

    const nextSquares = squares.slice() as GameBoard;
    nextSquares[clickedSquareIndex] = player;
    onPlay(nextSquares);
  }

  return (
    <section
      id="game-board"
      aria-label="Tic Tac Toe Board"
      className="flex flex-col items-center gap-4"
    >
      {/* Status banner with dynamic styling & smooth entrance */}
      <m.div
        id="board-status"
        aria-live="polite"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-wide shadow-sm transition-all select-none ${
          winner
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : isDraw
              ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
              : "border-border/60 bg-muted/40 text-foreground"
        }`}
      >
        <span
          className={`size-2 rounded-full ${
            winner
              ? "animate-pulse bg-emerald-400"
              : isDraw
                ? "bg-amber-400"
                : player === "X"
                  ? "bg-sky-400"
                  : "bg-amber-400"
          }`}
        />
        <span>{status}</span>
      </m.div>

      {/* 3x3 Grid with staggered unveiling */}
      <m.div
        id="board-state"
        role="grid"
        aria-label="3 by 3 game board"
        variants={boardContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid size-64 grid-cols-3 grid-rows-3 gap-2 rounded-2xl border border-border/60 bg-muted/20 p-2.5 shadow-xl backdrop-blur-sm sm:size-72"
      >
        {squares.map((squareValue, squareIndex) => (
          <m.div
            key={squareIndex}
            variants={squareItemVariants}
            className="size-full"
          >
            <Square
              value={squareValue}
              onSquareClick={() => handleClick(squareIndex)}
              isWinning={winningSquares?.includes(squareIndex) ?? false}
            />
          </m.div>
        ))}
      </m.div>
    </section>
  );
}

import { create } from "zustand";

interface GameState {
  count: number;
  setCount: () => void;
}
