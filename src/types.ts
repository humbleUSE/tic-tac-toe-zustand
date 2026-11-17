export type Player = "X" | "O";

export type SquareValue = Player | null;

export interface BoardProps {
  squares: GameBoard;
  onPlay: (nextSquares: GameBoard) => void;
}
export interface Square {
  value: SquareValue;
  onSquareClick: () => void;
  isWinning?: boolean;
}
// export type Squares = Square[];
export type GameBoard = SquareValue[];
export type History = GameBoard[];

export interface ScoreState {
  xWins: number;
  oWins: number;
  draws: number;
}
