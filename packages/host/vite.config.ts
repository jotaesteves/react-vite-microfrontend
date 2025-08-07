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
        shared: "http://localhost:3008/assets/remoteEntry.js",
        mfHeader: "http://localhost:3001/assets/remoteEntry.js",
        mfFooter: "http://localhost:3002/assets/remoteEntry.js",
        "mf-canais-e-servicos": "http://localhost:3003/assets/remoteEntry.js",
        "mf-dados-pessoais": "http://localhost:3004/assets/remoteEntry.js",
        "mf-historico-interacoes": "http://localhost:3005/assets/remoteEntry.js",
        "mf-patrimonio-e-produtos": "http://localhost:3006/assets/remoteEntry.js",
        "mf-visao-360": "http://localhost:3007/assets/remoteEntry.js",
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
