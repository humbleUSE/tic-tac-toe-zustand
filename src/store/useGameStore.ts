import type { Player, Squares, SquareValue } from "@/types";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type GameStoreState = GameState & GameAction;
interface GameState {
  squares: Squares;
  xIsNext: boolean;
}
interface GameAction {
  setSquares: (s: Squares | ((s: Squares) => Squares)) => void;
  setXIsNext: (b: boolean | ((b: boolean) => boolean)) => void;
}
export const useGameStore = create<GameStoreState>(
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

// calculate winner
export function calculateWinner(squares: Squares) {
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

function calculateTurns(squares: Squares) {
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
  const squares = state.squares;
  const xIsNext = state.xIsNext;
  const winner = calculateWinner(squares);
  const isDraw = calculateTurns(squares);
  const player: SquareValue = xIsNext ? "X" : "O";

  const status = calculateStatus(winner, isDraw, player);
  console.log(status);
  return { status, winner, player, isDraw };
}
