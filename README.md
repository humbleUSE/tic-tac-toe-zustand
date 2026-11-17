# Tic-Tac-Toe — Zustand State Architecture

A React and TypeScript Tic-Tac-Toe implementation designed as a Zustand architecture study, highlighting composed state, middleware patterns, persistent score tracking, derived selectors, optimized subscriptions, and polished UI/UX built around maintainable frontend design.

> This project is not simply a Tic-Tac-Toe game. It is a practical demonstration of thoughtful React state modeling, Zustand-based application architecture, performance-conscious rendering, and interface design decisions.

## Why this project exists

A familiar game makes state-management decisions easy to see. This project uses the classic Tic-Tac-Toe domain to showcase:

- typed global state with Zustand
- composed middleware patterns
- selective persistence for durable vs transient data
- selector-driven UI optimization
- immutable game history and time-travel behavior
- clean separation between domain logic and presentation
- polished interaction design and responsive UX

The app is the vehicle. The real subject is the software design.

---

## What this project demonstrates

### Zustand-first architecture
The game state lives in a single store, but it is not a dumping ground for everything. The repository separates concerns across a few explicit domains:

- game session state
- scoreboard state
- persisted preferences
- view-derived status values
- UI-only presentation concerns

This creates a more maintainable mental model and reduces unnecessary re-renders.

### Middleware and persistence strategy
The main game store uses Zustand `combine` and `persist` together:

```ts
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
        history: [initialBoard] as History,
        currentMove: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
        hasRecordedCurrentGame: false,
      },
      (set) => ({
        setHistory: (nextHistory) => {
          set((state) => ({
            history:
              typeof nextHistory === "function"
                ? nextHistory(state.history)
                : nextHistory,
          }));
        },

        setCurrentMove: (currentMove) => {
          set((state) => ({
            currentMove:
              typeof currentMove === "function"
                ? currentMove(state.currentMove)
                : currentMove,
          }));
        },

        resetGame: () => {
          set({
            history: [initialBoard] as History,
            currentMove: 0,
            hasRecordedCurrentGame: false,
          });
        },

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

        recordDraw: () => {
          set((state) => {
            if (state.hasRecordedCurrentGame) return state;
            return {
              draws: state.draws + 1,
              hasRecordedCurrentGame: true,
            };
          });
        },

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
```

### Why this matters
The persistence boundary is deliberate:

- scores persist
- theme preferences persist
- current board state does not persist in the same way
- transient session state remains ephemeral
- game logic remains consistent without polluting the UI layer

This is a strong example of domain-aware Zustand usage rather than blindly storing everything in a single global object.

---

## Selectors, derived state, and optimization

A key part of this project is reducing unnecessary render work. Components do not subscribe to the entire store unless they need to. Instead, they select only what they need.

```tsx
import { useShallow } from "zustand/react/shallow";
import { selectGameStatus, useGameStore } from "@/store/useGameStore";

const { winner, isDraw, player, status, winningSquares } = useGameStore(
  useShallow(selectGameStatus),
);
```

The store also exports pure, derived game rules:

```ts
export function calculateWinningSquares(squares: GameBoard) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return line;
  }

  return null;
}

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
```

### Efficient render patterns
This project uses:

- narrow selectors for individual values
- `useShallow` for derived selector objects
- immutable history updates
- localized action usage
- avoid-all-at-once subscriptions

This makes the app a good reference for how to build a React app that scales without washing away state clarity.

---

## Game history as a state model

The move list is modeled as a history timeline, not a one-off state array. Each move snapshots a board state and allows navigation backward and forward through game progression.

```ts
function handlePlay(nextSquares: GameBoard) {
  const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
}
```

This is a simple but important software architecture decision:

- previous moves remain intact
- future branches are removed when progressing from an earlier move
- the app can reason about game progression cleanly
- the UI can represent a timeline of moves with minimal logic

This is fundamentally better than mutating a single board state and losing historical context.

---

## Representing theme preferences separately

The app also includes a second store: `useThemeStore.ts`. It is dedicated to theme preferences and persists independently from the game score state.

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";
export type ThemeAccent = "default" | "violet" | "emerald" | "amber" | "rose";

interface ThemeState {
  mode: ThemeMode;
  accent: ThemeAccent;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      accent: "default",
      setMode: (mode) => set({ mode }),
      setAccent: (accent) => set({ accent }),
    }),
    {
      name: "tic-tac-toe-theme",
    },
  ),
);
```

This separation is useful because app appearance is not part of the game domain. It also demonstrates how a multi-store architecture can be clearer than a single monolithic global state.

---

## UI/UX design decisions

This repository is designed with a strong UI/UX angle, not just functional gameplay. The user experience is intentionally thoughtful.

### Interaction and feedback
- board tile hover states
- visual win highlighting
- confetti celebration on victory
- animated status banner
- subtle motion on entry for panels and tiles
- history state highlighting for current move

### Visual design
- dark/light mode support
- accent color selection
- responsive layout
- glassmorphism-inspired surfaces
- visually consistent card, panel, and button system
- accessibility-friendly contrast and structure

### Software design and polish
- components are focused and readable
- shared UI primitives are centralized
- action/state boundaries remain clear
- type safety reduces UI logic errors
- architecture remains small but educational

---

## Notable features

- Zustand `combine` + `persist` usage
- derived selector pattern with `useShallow`
- local game history state with immutable updates
- board win detection and replayable state transitions
- scoreboard persistence
- theme preference persistence
- responsive interface
- interactive motion feedback
- accessible status labeling
- reusable UI primitives
- maintainable multi-store state separation

---

## Tech stack

- React 19
- TypeScript
- Zustand 5
- Vite
- Tailwind CSS 4
- Base UI
- Motion
- Lucide React
- canvas-confetti

---

## Run locally

Requires Bun (the repository includes `bun.lock`).

```bash
bun install
bun run dev
```

### Available scripts

```bash
bun run build
bun run preview
bun run lint
```

---

## Project structure

```text
src/
├── components/
│   ├── ui/                 # reusable button, dialog, dropdown primitives
│   ├── AboutProject.tsx    # project overview dialog
│   ├── Board.tsx           # board UI and win celebration
│   ├── Game.tsx            # orchestrates the game flow and score logic
│   ├── Moves.tsx           # move history panel
│   ├── Scoreboard.tsx      # score summary
│   ├── Square.tsx          # interactive square component
│   └── ThemeCustomizer.tsx # theme controls
├── lib/
│   └── utils.ts            # shared utility exports
├── store/
│   ├── useGameStore.ts     # game logic, selectors, state shape, persistence
│   └── useThemeStore.ts    # theme preferences and persistence
├── App.tsx                 # app shell and layout
├── index.css               # theme tokens and visual system
├── main.tsx               # entry point
├── types.ts                # game domain types
└── App.css                # legacy starter file (leftover from template scaffolding)
```

---

## A useful code-reading path

1. Read `src/store/useGameStore.ts` first.
2. Then read `src/store/useThemeStore.ts`.
3. Follow `src/components/Game.tsx` for orchestration.
4. Review `src/components/Board.tsx`, `Moves.tsx`, and `Scoreboard.tsx` for UI behavior.
5. Finish with `src/components/ThemeCustomizer.tsx` for theme state integration.

---

## Final note

This project is an exploration of practical Zustand and frontend design decisions—not an attempt to prove that Tic-Tac-Toe is a complex application. The domain is intentionally small so the architecture, optimization strategies, and UI/UX craftsmanship remain easy to inspect, teach, and learn from.

If you are studying state management patterns, this app is a useful example of how a small app can still reflect high-quality engineering decisions.
