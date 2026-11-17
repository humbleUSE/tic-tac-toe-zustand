import type { Square } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Square({
  value,
  onSquareClick,
  isWinning = false,
}: Square) {
  const isFilled = Boolean(value);

  const winClasses = isWinning
    ? "border-emerald-400 bg-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
    : "";

  return (
    <Button
      type="button"
      onClick={onSquareClick}
      disabled={isFilled}
      aria-label={value ? `Square marked ${value}` : "Empty square"}
      className={cn(
        "size-full rounded-xl bg-card/80 backdrop-blur-sm",
        !isFilled
          ? "cursor-pointer hover:border-border hover:bg-accent/70 hover:shadow-md active:scale-95"
          : "cursor-default shadow-xs",
        winClasses,
      )}
    >
      {/* Player X */}
      {value === "X" && (
        <span className="animate-in text-3xl font-black text-sky-400 drop-shadow-sm duration-200 select-none zoom-in-75 fade-in sm:text-4xl">
          ✕
        </span>
      )}

      {/* Player O */}
      {value === "O" && (
        <span className="animate-in text-3xl font-black text-amber-400 drop-shadow-sm duration-200 select-none zoom-in-75 fade-in sm:text-4xl">
          ◯
        </span>
      )}
    </Button>
  );
}
