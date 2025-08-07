import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mf-patrimonio-e-produtos",
      filename: "remoteEntry.js",
      exposes: {
        "./PatrimonioEProdutos": "./src/PatrimonioEProdutos.tsx",
      },
      shared: {
        react: {},
        "react-dom": {},
      },
    }),
  ],
  preview: {
    port: 3006,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3006,
    cors: true,
  },
});
