# Tic-Tac-Toe with Zustand

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

A two-player Tic-Tac-Toe game built with React and TypeScript to explore Zustand as a lightweight approach to shared state management. This is a learning project and a Zustand-powered reworking of my [Tic-Tac-Toe game with move history](https://github.com/humbleUSE/tic-tac-toe-replay).

## Learning goals

This project uses a familiar game to focus on how state is designed and managed, rather than introducing a new domain at the same time. The goal is to understand Zustand by building, comparing, and documenting each step.

- Create a typed Zustand store with state and actions.
- Read state with selectors and update it with predictable actions.
- Keep game rules separate from UI components and store wiring.
- Model move history and time travel in a single source of truth.
- Compare the resulting approach with the Context API and reducer patterns used in earlier projects.

## Game features

- **Classic 3 × 3 gameplay:** Take turns placing X and O on the board.
- **Turn and result status:** Show whose turn is next, announce a winner or draw, and prevent moves after the game ends.
- **Winning-line highlight:** Highlight the three squares that form a winning line.
- **Move history and time travel:** Select a past move to revisit that board position.
- **Branching from an earlier move:** Make a move from a past position and replace the later timeline.
- **New game:** Reset the board and history to start again.
- **Responsive interface:** Play on mobile or desktop.

## Tech stack

- React 19 and TypeScript
- Zustand for shared game state
- Vite for development and production builds
- Tailwind CSS v4 for styling
- ESLint for code-quality checks
- Bun for dependency management and scripts

## Getting started

### Requirements

Install [Bun](https://bun.sh/) (1.4 or later).

### Clone and run

```bash
git clone https://github.com/humbleUSE/tic-tac-toe-zustand.git
cd tic-tac-toe-zustand
bun install
bun run dev
```

Open the local URL printed by Vite to play. The starter repository includes the app source and configuration, so after cloning and installing dependencies you can run it locally.

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Vite development server with hot module replacement. |
| `bun run typecheck` | Type-check the app and Vite configuration without emitting files. |
| `bun run build` | Type-check and create an optimized production build in `dist/`. |
| `bun run preview` | Preview the production build locally. |
| `bun run lint` | Check the project with ESLint. |

## Project structure

```text
.
├── index.html                 # Vite HTML entry point
├── src/
│   ├── components/
│   │   └── Board.tsx          # Board and square UI
│   ├── store/
│   │   └── gameStore.ts       # Zustand store, state, and actions
│   ├── utilities/
│   │   └── game.ts            # Game rules and winner calculation
│   ├── App.tsx                # Game layout and store selectors
│   ├── index.css              # Tailwind CSS entry point and global styles
│   └── main.tsx               # React application entry point
├── eslint.config.js           # ESLint flat configuration
├── package.json               # Dependencies and project scripts
├── tsconfig*.json             # TypeScript project configuration
└── vite.config.ts             # Vite, React, and Tailwind plugin configuration
```

## Learning log and roadmap

Use this section as a small record of the concepts explored while building the game. Add notes as implementation decisions become clearer; the checklist is a guide, not a claim that every Zustand feature is already covered.

- [x] Set up a typed React, TypeScript, Vite, Tailwind CSS, and ESLint project.
- [x] Create a Zustand store for the board, active move, and game actions.
- [x] Use selectors to subscribe UI components to the state they need.
- [x] Implement winner detection, move history, time travel, and branching.
- [ ] Document why the game state belongs in a store instead of component-local state.
- [ ] Compare Zustand with the Context API and reducer approach in the earlier projects.
- [ ] Explore store testing and persistence, and note when each is useful.

### Notes to capture

For each learning milestone, record the problem, the implementation choice, what you learned, and any trade-offs. Keep these notes grounded in the code rather than treating a state library as a one-size-fits-all solution.

## License

This project currently has no license configured.

---

Built as a hands-on learning project for React state management.
