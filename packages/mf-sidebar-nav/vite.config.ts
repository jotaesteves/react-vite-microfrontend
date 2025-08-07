import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mf-sidebar-nav",
      filename: "remoteEntry.js",
      exposes: {
        "./SideBarNav": "./src/SideBarNav.tsx",
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
  base: "/",
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "assets",
  },
  preview: {
    port: 3009,
    cors: true,
  },
  server: {
    port: 3009,
    cors: true,
  },
});
