import type { Player, GameBoard, SquareValue, History } from "@/types";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export type GameStoreState = GameState & GameAction;
interface GameState {
  history: History;
  currentMove: number;
  xWins: number;
  oWins: number;
  draws: number;
  hasRecordedCurrentGame: boolean;
}
interface GameAction {
  setHistory: (s: History | ((s: History) => History)) => void;
  setCurrentMove: (n: number | ((n: number) => number)) => void;
  resetGame: () => void;
  recordWin: (winner: Player) => void;
  recordDraw: () => void;
  resetScores: () => void;
}
const initialBoard = Array<SquareValue>(9).fill(null) as GameBoard;

export const useGameStore = create(
  persist(
    combine(
      {
        // Initial state
        history: [initialBoard] as History,
        currentMove: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
        hasRecordedCurrentGame: false,
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
        // set current move
        setCurrentMove: (currentMove: number | ((n: number) => number)) => {
          set((state) => {
            return {
              currentMove:
                typeof currentMove === "function"
                  ? currentMove(state.currentMove)
                  : currentMove,
            };
          });
        },
        // Reset the game
        resetGame: () => {
          set({
            history: [initialBoard] as History,
            currentMove: 0,
            hasRecordedCurrentGame: false,
          });
        },
        // Record X or O win
        recordWin: (winner: Player) => {
          set((state) => {
            if (state.hasRecordedCurrentGame) return state;
            return {
              xWins: winner === "X" ? state.xWins + 1 : state.xWins,
              oWins: winner === "O" ? state.oWins + 1 : state.oWins,
              hasRecordedCurrentGame: true,
            };
          });
        },
        // Record draw
        recordDraw: () => {
          set((state) => {
            if (state.hasRecordedCurrentGame) return state;
            return {
              draws: state.draws + 1,
              hasRecordedCurrentGame: true,
            };
          });
        },
        // Reset scoreboard
        resetScores: () => {
          set({
            xWins: 0,
            oWins: 0,
            draws: 0,
          });
        },
      }),
    ),
    {
      name: "tic-tac-toe-scores",
      partialize: (state) => ({
        xWins: state.xWins,
        oWins: state.oWins,
        draws: state.draws,
      }),
    },
  ),
);

// Winning lines on the 3x3 board
const winningLines = [
  [0, 1, 2], // row
  [3, 4, 5], // row
  [6, 7, 8], // row
  [0, 3, 6], // column
  [1, 4, 7], // column
  [2, 5, 8], // column
  [0, 4, 8], // diagonals
  [2, 4, 6], // diagonals
];

// Returns the indices of the 3 winning squares, or null when there is no winner
export function calculateWinningSquares(squares: GameBoard) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return line;
  }

  return null;
}

// calculate winner
export function calculateWinner(squares: GameBoard) {
  const winningSquares = calculateWinningSquares(squares);
  return winningSquares ? squares[winningSquares[0]] : null;
}

export function calculateTurns(squares: GameBoard) {
  return squares.every(Boolean);
}

export function calculateStatus(
  winner: Player | null,
  isDraw: boolean,
  player: Player,
) {
  if (!winner && isDraw) return "Draw!";
  if (winner) return `Winner! is ${winner}`;

  return `Next player: ${player}!`;
}

export function selectGameStatus(state: GameStoreState) {
  const currentSquares = state.history[state.currentMove];
  const winner = calculateWinner(currentSquares);
  const winningSquares = calculateWinningSquares(currentSquares);
  const isDraw = calculateTurns(currentSquares);
  const player: SquareValue = state.currentMove % 2 === 0 ? "X" : "O";

  const status = calculateStatus(winner, isDraw, player);
  return { status, winner, player, isDraw, winningSquares };
}
