import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mf-canais-e-servicos",
      filename: "remoteEntry.js",
      exposes: {
        "./CanaisEServicos": "./src/CanaisEServicos.tsx",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  preview: {
    port: 3003,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3003,
    cors: true,
  },
});
