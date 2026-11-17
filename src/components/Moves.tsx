import { useGameStore } from "@/store/useGameStore";
import { HistoryIcon, RotateCcw } from "lucide-react";
import * as m from "motion/react-client";

export default function Moves() {
  const history = useGameStore((state) => state.history);
  const currentMove = useGameStore((state) => state.currentMove);
  const resetGame = useGameStore((state) => state.resetGame);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  return (
    <m.aside
      id="game-moves"
      aria-label="Move history"
      initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3 shadow-xl backdrop-blur-sm sm:w-56"
    >
      {/* Header with New Game button */}
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          <HistoryIcon className="size-3.5" />
          <span>History</span>
        </div>
        <button
          onClick={resetGame}
          type="button"
          aria-label="Restart game"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:border-destructive/40 hover:bg-destructive/15 hover:text-destructive active:scale-95"
        >
          <RotateCcw className="size-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Move list */}
      <div className="max-h-64 scrollbar-thin overflow-y-auto pr-1 sm:max-h-72">
        <ol className="flex flex-col gap-1.5" id="move-list">
          {history.map((_, historyIndex) => {
            const isCurrent = historyIndex === currentMove;
            const description =
              historyIndex > 0 ? `Move #${historyIndex}` : "Game start";

            return (
              <li key={historyIndex}>
                <button
                  type="button"
                  onClick={() => setCurrentMove(historyIndex)}
                  className={`group flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-1.5 text-xs font-medium transition-all select-none ${
                    isCurrent
                      ? "border-primary/40 bg-primary/10 font-semibold text-primary shadow-xs"
                      : "border-transparent bg-card/60 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`size-1.5 rounded-full transition-all ${
                        isCurrent
                          ? "scale-125 bg-primary"
                          : "bg-muted-foreground/40 group-hover:bg-muted-foreground"
                      }`}
                    />
                    <span>{description}</span>
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                      Current
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </m.aside>
  );
}
