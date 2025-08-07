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
        "mf-sidebar-nav": "http://localhost:3009/assets/remoteEntry.js",
        "mf-inicio": "http://localhost:3010/assets/remoteEntry.js",
        "mf-registos": "http://localhost:3011/assets/remoteEntry.js",
        "mf-outbounds": "http://localhost:3012/assets/remoteEntry.js",
        "mf-vendas": "http://localhost:3013/assets/remoteEntry.js",
        "mf-scripts": "http://localhost:3014/assets/remoteEntry.js",
        "mf-documentacao": "http://localhost:3015/assets/remoteEntry.js",
        "mf-kpis": "http://localhost:3016/assets/remoteEntry.js",
        "mf-definicoes": "http://localhost:3017/assets/remoteEntry.js",
        "mf-pesquisa": "http://localhost:3018/assets/remoteEntry.js",
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
