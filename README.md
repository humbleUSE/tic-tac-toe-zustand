# Tic-Tac-Toe — Zustand State Architecture

A small game used as a practical study in **Zustand state architecture**. The focus is not the rules of Tic-Tac-Toe: it is how to model related state, compose Zustand middleware, persist only durable data, derive UI state, and keep React subscriptions focused—while delivering a polished, accessible interface.

> **What this project demonstrates:** a typed Zustand store for move history and match scores; `combine` and `persist` middleware; shallow selection of derived state; narrow component selectors; immutable time-travel history; and a separate persisted store for theme preferences.

## Why this project exists

A familiar game makes state-management decisions easy to see. This implementation uses it to explore how an application can separate game state and actions from presentation, keep transient play state distinct from durable preferences and scores, and make UI components subscribe only to the data they need.

The app is the demonstration vehicle; the engineering decisions—state shape, middleware, selectors, component boundaries, visual system, and interaction design—are the subject.

## Zustand patterns in the code

### 1. Compose a typed state-and-actions store

[`src/store/useGameStore.ts`](src/store/useGameStore.ts) defines game state and actions together with `combine`, then wraps the result in `persist`. The middleware composition gives the store a clear initial-state/action boundary and persistence behavior without adding a separate reducer framework.

```ts
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
        // Actions are defined alongside the state they update.
        resetGame: () =>
          set({
            history: [initialBoard] as History,
            currentMove: 0,
            hasRecordedCurrentGame: false,
          }),
        // Other actions update history, scores, and match status.
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

The `partialize` option is an important persistence boundary: scores survive reloads, while the in-progress board, move history, and one-game guard remain session state. `hasRecordedCurrentGame` plus guarded `recordWin`/`recordDraw` actions prevents a finished match from being counted more than once.

### 2. Derive view state and use shallow selection

The store exports `selectGameStatus`, a pure selector that derives the current player, winner, draw state, status text, and winning squares from history and the current move. Components that consume this object use Zustand's `useShallow` so a newly-created selector result does not trigger a render when its selected fields are shallowly unchanged.

```tsx
import { useShallow } from "zustand/react/shallow";
import { selectGameStatus, useGameStore } from "@/store/useGameStore";

const { status, winner, player, isDraw, winningSquares } = useGameStore(
  useShallow(selectGameStatus),
);
```

Other components use narrow selectors for individual values/actions, for example `useGameStore((state) => state.xWins)` in `Scoreboard` and separate `history`, `currentMove`, and action selections in `Moves`. This keeps subscriptions aligned with what each component actually renders rather than reading the whole store everywhere.

### 3. Keep derived game logic out of rendering components

`calculateWinningSquares`, `calculateWinner`, `calculateTurns`, `calculateStatus`, and `selectGameStatus` live alongside the game store in `useGameStore.ts`. This makes the rules and derived state independently understandable, while `Board` and `Game` focus on rendering and coordinating interactions.

### 4. Model history as navigable immutable state

`Game` appends a new board snapshot and truncates any future branch when a move is made after navigating backward. `Moves` selects an earlier index to travel through the game without mutating prior snapshots.

```ts
function handlePlay(nextSquares: GameBoard) {
  const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
}
```

This simple history model makes time travel and replay understandable without introducing a separate history library.

### 5. Separate unrelated state domains

[`src/store/useThemeStore.ts`](src/store/useThemeStore.ts) owns theme mode and accent selection in its own persisted Zustand store. Theme preferences therefore have a distinct lifecycle and persistence key from game scores. `ThemeCustomizer` applies the stored preference to the document root, including light, dark, system, and accent variants.

## UI/UX and architecture

- **Focused components:** `Game`, `Board`, `Square`, `Moves`, `Scoreboard`, and `ThemeCustomizer` each have a clear presentation or interaction role; shared domain types live in `src/types.ts`.
- **Intentional interaction feedback:** Motion entrance and staggered board-square animations, move highlighting, win-state emphasis, and a confetti celebration provide feedback without changing the state model.
- **Responsive visual system:** Tailwind CSS v4, theme tokens, dark/light modes, five accent choices, and responsive board/history layout support customization and smaller viewports.
- **Accessible interactions:** semantic buttons, descriptive labels, a polite live status region, and keyboard-friendly UI primitives from Base UI make key game interactions understandable beyond visual styling.
- **Reusable UI foundations:** locally composed UI primitives in `src/components/ui` provide consistent button, dialog, and dropdown behavior.
- **Developer experience:** TypeScript, Vite, a `@/` source alias, the React Compiler preset, and the Code Inspector Vite plugin support type-safe development and DOM-to-source inspection.

## Tech stack

- **React 19 + TypeScript** — component model and type-safe state/actions.
- **Zustand 5** — lightweight global state, `combine`, `persist`, selectors, and `useShallow`.
- **Vite** — development server and production build.
- **Tailwind CSS 4 + Base UI** — styling and accessible interaction primitives.
- **Motion, Lucide, and canvas-confetti** — animation, icons, and win feedback.

## Run locally

Requires Bun (the repository includes `bun.lock`).

```bash
bun install
bun run dev
```

Available project scripts:

```bash
bun run build    # TypeScript project build and Vite production build
bun run preview  # Preview the production build locally
bun run lint     # Run ESLint
```

## Project structure

```text
src/
├── components/       # Game UI, interaction components, and reusable UI primitives
├── lib/              # Small shared utilities
├── store/            # Game and theme Zustand stores, actions, selectors, and game logic
├── types.ts          # Shared game-domain types
├── App.tsx           # App composition and top-level layout
└── main.tsx          # React entry point
```

## A useful code-reading path

1. Start with `src/store/useGameStore.ts` for state shape, actions, middleware, persistence, and derived game selectors.
2. Read `src/store/useThemeStore.ts` to compare a separate, fully persisted preference domain.
3. Follow `src/components/Game.tsx` for orchestration, state selection, score recording, and move-history branching.
4. See `src/components/Board.tsx`, `Moves.tsx`, and `Scoreboard.tsx` for UI-specific subscriptions and interactions.

---

This project is an exploration of practical Zustand and frontend design decisions—not a claim that Tic-Tac-Toe itself is a complex application. The intentionally small domain makes the state architecture and user experience easier to inspect.
