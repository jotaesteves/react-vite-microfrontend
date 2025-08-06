import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mfHeader",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/Header.tsx",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  base: "/",
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "assets",
  },
  preview: {
    port: 3001,
    cors: true,
    host: true,
  },
  server: {
    port: 3001,
    cors: true,
    host: true,
  },
});
