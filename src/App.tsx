import Game from "./components/Game";
import AboutProject from "./components/AboutProject";
import ThemeCustomizer from "./components/ThemeCustomizer";

import * as m from "motion/react-client";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4">
      {/* Header with reveal animation */}
      <m.header
        initial={{ opacity: 0, y: -24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Tic-Tac-Toe
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Powered by React 19 & Zustand
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <AboutProject />
          <ThemeCustomizer />
        </div>
      </m.header>

      <Game />
    </div>
  );
}
