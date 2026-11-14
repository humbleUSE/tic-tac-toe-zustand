export type Player = 'X' | 'O'
export type SquareValue = Player | null
export type BoardState = SquareValue[]

export interface GameState {
  history: BoardState[]
  currentMove: number
  playMove: (square: number) => void
  jumpTo: (move: number) => void
  newGame: () => void
}
