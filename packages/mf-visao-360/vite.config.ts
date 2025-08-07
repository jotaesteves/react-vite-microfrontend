import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mf-visao-360",
      filename: "remoteEntry.js",
      exposes: {
        "./Visao360": "./src/Visao360.tsx",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  preview: {
    port: 3007,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3007,
    cors: true,
  },
});
