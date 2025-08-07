import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mf-kpis",
      filename: "remoteEntry.js",
      exposes: {
        "./KPIs": "./src/KPI's.tsx",
      },
      remotes: {
        shared: "http://localhost:3008/assets/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 3016,
  },
});
