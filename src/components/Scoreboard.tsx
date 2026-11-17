import { useGameStore } from "@/store/useGameStore";
import { Trophy, RotateCcw } from "lucide-react";
import * as m from "motion/react-client";

export default function Scoreboard() {
  const xWins = useGameStore((state) => state.xWins);
  const oWins = useGameStore((state) => state.oWins);
  const draws = useGameStore((state) => state.draws);
  const resetScores = useGameStore((state) => state.resetScores);

  return (
    <m.div
      id="scoreboard"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="mb-4 flex w-full max-w-sm items-center justify-between rounded-2xl border border-border/60 bg-muted/20 px-4 py-2.5 shadow-xl backdrop-blur-sm sm:max-w-md"
    >
      <div className="flex items-center gap-2">
        <Trophy className="size-4 text-amber-400" />
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Score
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sky-400">X:</span>
          <span className="rounded-md bg-card px-2 py-0.5 border border-border/50 text-foreground">
            {xWins}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-amber-400">O:</span>
          <span className="rounded-md bg-card px-2 py-0.5 border border-border/50 text-foreground">
            {oWins}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-muted-foreground">Draws:</span>
          <span className="rounded-md bg-card px-2 py-0.5 border border-border/50 text-foreground">
            {draws}
          </span>
        </div>
      </div>

      {(xWins > 0 || oWins > 0 || draws > 0) && (
        <button
          onClick={resetScores}
          type="button"
          title="Reset Scoreboard"
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border/60 bg-card p-1 text-muted-foreground transition-all hover:border-destructive/40 hover:bg-destructive/15 hover:text-destructive active:scale-95"
        >
          <RotateCcw className="size-3" />
        </button>
      )}
    </m.div>
  );
}
