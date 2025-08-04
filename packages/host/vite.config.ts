import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        mfHeader: "http://localhost:3001/assets/remoteEntry.js",
        mfFooter: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    cors: true,
  },
});
