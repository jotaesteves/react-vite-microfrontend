import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        "./EventBus": "./src/shared/eventBus.ts",
        "./GlobalStore": "./src/stores/globalStore.ts",
        "./ErrorBoundary": "./src/components/ErrorBoundary.tsx",
        "./MicroFrontendProvider": "./src/providers/MicroFrontendProvider.tsx",
        "./useMicroFrontend": "./src/hooks/useMicroFrontend.ts"
      },
      shared: {
        react: {},
        "react-dom": {},
        zustand: {}
      }
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3008,
    cors: true
  },
  preview: {
    port: 3008,
    cors: true
  }
});
