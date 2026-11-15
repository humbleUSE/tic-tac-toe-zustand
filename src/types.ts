export type Player = "X" | "O";

export type SquareValue = Player | null;

export interface BoardProps {
  xIsNext: boolean;
  squares: Squares;
  onPlay: () => void;
}
export interface Square {
  value?: SquareValue;
  onSquareClick: () => void;
}
// export type Squares = Square[];
export type Squares = SquareValue[];
