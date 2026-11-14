import type { BoardState, Player } from '../types'

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

export function calculateWinner(board: BoardState): {
  winner: Player | null
  winningLine: number[]
} {
  for (const line of WINNING_LINES) {
    const [first, second, third] = line
    const mark = board[first]
    if (mark && mark === board[second] && mark === board[third]) {
      return { winner: mark, winningLine: [...line] }
    }
  }

  return { winner: null, winningLine: [] }
}
