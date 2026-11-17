import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Cpu, Layers, Heart } from "lucide-react";

export default function AboutProject() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer gap-2 shadow-xs transition-all hover:bg-muted"
          >
            <Info className="size-4 text-primary" />
            <span>About Project</span>
          </Button>
        }
      />
      <DialogContent className="max-h-[85vh] scrollbar-thin overflow-y-auto sm:max-w-md">
        <DialogHeader className="space-y-1.5 border-b border-border/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="size-4" />
            </span>
            <DialogTitle className="text-lg font-bold tracking-tight">
              Tic-Tac-Toe Zustand
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            A modern, performant implementation of the classic game showcasing
            state management mastery.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs leading-relaxed text-foreground/90">
          {/* Motive Section */}
          <div className="space-y-1.5 rounded-xl border border-border/40 bg-muted/30 p-3">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground text-primary uppercase">
              <Cpu className="size-3.5" />
              <span>Project Motive & Architecture</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              The primary motivation behind this project is to demonstrate the
              elegance, power, and versatility of{" "}
              <strong className="font-medium text-foreground">Zustand</strong>{" "}
              for state management in React 19 applications. Specifically, it
              showcases how Zustand's robust middleware ecosystem (such as{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-primary">
                combine
              </code>
              ) allows developers to write type-safe, boilerplate-free stores
              with unified state and action definitions. By decoupling game
              logic, move history, win calculation, and UI presentation, this
              project illustrates clean architecture principles without
              unnecessary complexity.
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground text-muted-foreground uppercase">
              <span>Tech Stack & Libraries</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="space-y-0.5 rounded-lg border border-border/60 bg-card p-2">
                <span className="block font-semibold text-foreground">
                  Core
                </span>
                <span className="text-muted-foreground">
                  React 19, TypeScript, Vite
                </span>
              </div>
              <div className="space-y-0.5 rounded-lg border border-border/60 bg-card p-2">
                <span className="block font-semibold text-foreground">
                  State Management
                </span>
                <span className="text-muted-foreground">
                  Zustand (with middleware)
                </span>
              </div>
              <div className="space-y-0.5 rounded-lg border border-border/60 bg-card p-2">
                <span className="block font-semibold text-foreground">
                  UI & Styling
                </span>
                <span className="text-muted-foreground">
                  Tailwind CSS v4, Base UI, shadcn
                </span>
              </div>
              <div className="space-y-0.5 rounded-lg border border-border/60 bg-card p-2">
                <span className="block font-semibold text-foreground">
                  Effects & Animation
                </span>
                <span className="text-muted-foreground">
                  Motion (React), Canvas Confetti
                </span>
              </div>
            </div>
          </div>

          {/* Creator / Author Section */}
          <div className="flex items-center justify-between border-t border-border/50 pt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span>Created with</span>
              <Heart className="size-3 fill-destructive text-destructive" />
              <span>by</span>
            </div>
            <a
              href="https://github.com/humbleUSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 font-medium text-foreground shadow-2xs transition-all hover:border-primary/50 hover:bg-accent hover:text-primary active:scale-95"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02_000000 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>humbleUSE</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
