import type { Player, GameBoard, SquareValue, History } from "@/types";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type GameStoreState = GameState & GameAction;
interface GameState {
  history: History;
  xIsNext: boolean;
}
interface GameAction {
  setHistory: (s: History | ((s: History) => History)) => void;
  setXIsNext: (b: boolean | ((b: boolean) => boolean)) => void;
}
export const useGameStore = create(
  combine(
    {
      // Initial state
      history: [Array<SquareValue>(9).fill(null)] as History,
      xIsNext: true,
    },
    // Actions
    (set) => ({
      // Update the squares on the board
      setHistory: (
        nextHistory: History | ((prevState: History) => History),
      ) => {
        set((state) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(state.history)
              : nextHistory,
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

// calculate winner
export function calculateWinner(squares: GameBoard) {
  console.log(squares);
  const lines = [
    [0, 1, 2], // row
    [3, 4, 5], // row
    [6, 7, 8], // row
    [0, 3, 6], // column
    [1, 4, 7], // column
    [2, 5, 8], // column
    [0, 4, 8], // diagonals
    [2, 4, 6], // diagonals
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a]; // winning Player "x" or "O"
  }

  return null;
}

function calculateTurns(squares: GameBoard) {
  return squares.every(Boolean);
}

export function calculateStatus(
  winner: Player | null,
  isDraw: boolean,
  player: Player,
) {
  if (!winner && isDraw) return "Draw!";
  if (winner) return `Winner ${winner}`;

  return `Next player: ${player}!`;
}

export function selectGameStatus(state: GameStoreState) {
  const currentSquares = state.history[state.history.length - 1];
  const xIsNext = state.xIsNext;
  const winner = calculateWinner(currentSquares);
  const isDraw = calculateTurns(currentSquares);
  const player: SquareValue = xIsNext ? "X" : "O";

  const status = calculateStatus(winner, isDraw, player);
  console.log(status);
  return { status, winner, player, isDraw };
}
