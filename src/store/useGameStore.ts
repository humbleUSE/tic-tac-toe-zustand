import type { Player, Squares, SquareValue } from "@/types";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useGameStore = create(
  combine(
    {
      // Initial state
      squares: Array<SquareValue>(9).fill(null),
      xIsNext: true,
    },
    // Actions
    (set) => ({
      // Update the squares on the board
      setSquares: (
        nextSquares: Squares | ((prevState: Squares) => Squares),
      ) => {
        set((state) => ({
          squares:
            typeof nextSquares === "function"
              ? nextSquares(state.squares)
              : nextSquares,
        }));
      },
      // Toggle xIsNext
      setXIsNext: (nextXIsNext: boolean | ((b: boolean) => boolean)) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === "function"
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }));
      },
    }),
  ),
);
