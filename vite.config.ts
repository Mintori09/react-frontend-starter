import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "./",

  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/testing/setup-tests.ts",
    exclude: ["**/node_modules/**", "**/e2e/**"],
    include: ["src/**"],
  },
  optimizeDeps: { exclude: ["fsevents"] },
  build: {
    rollupOptions: {
      external: ["fs/promises"],
      output: {
        experimentalMinChunkSize: 3500,
      },
    },
  },
});
