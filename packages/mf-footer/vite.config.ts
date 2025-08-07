import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfFooter",
      filename: "remoteEntry.js",
      exposes: {
        "./Footer": "./src/Footer.tsx",
      },
      remotes: {
        shared: "http://localhost:3008/assets/remoteEntry.js",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  preview: {
    port: 3002,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
    cors: true,
  },
});
