import path from "node:path";
import { codeInspectorPlugin } from "code-inspector-plugin";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Click a DOM element to jump to its source location in the IDE.
    // - hotKeys: ["ctrlKey"] uses Ctrl as the trigger (instead of Shift + Alt)
    // - hideDomPathAttr: removes data-insp-path from the DOM for cleaner markup
    codeInspectorPlugin({
      bundler: "vite",
      hotKeys: ["ctrlKey"],
      hideDomPathAttr: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
