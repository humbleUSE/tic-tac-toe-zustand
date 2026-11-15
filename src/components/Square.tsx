import type { Square } from "@/types";

export default function Square({
  value ,
  onSquareClick: onSquareClick,
}: Square) {
  return (
    <button className="btn size-full" onClick={onSquareClick} type="button">
      {value}
    </button>
  );
}
