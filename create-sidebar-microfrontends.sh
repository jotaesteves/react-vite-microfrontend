#!/bin/bash

# Define microfrontend configurations as arrays
microfrontend_names=("mf-registos" "mf-outbounds" "mf-vendas" "mf-scripts" "mf-documentacao" "mf-kpis" "mf-definicoes" "mf-pesquisa")
microfrontend_ports=("3011" "3012" "3013" "3014" "3015" "3016" "3017" "3018")
microfrontend_icons=("📁" "📞" "🛍️" "📃" "📔" "📊" "⚙️" "🔍")
microfrontend_titles=("Registos" "Outbounds" "Vendas" "Scripts" "Documentação" "KPI's" "Definições" "Pesquisa")

# Base directory
BASE_DIR="/Users/jorgeesteves/projects/react-vite-microfrontend/packages"

# Create each microfrontend
for i in "${!microfrontend_names[@]}"; do
    mf_name="${microfrontend_names[$i]}"
    port="${microfrontend_ports[$i]}"
    icon="${microfrontend_icons[$i]}"
    title="${microfrontend_titles[$i]}"
    component_name="${title// /}"

    echo "Creating $mf_name with port $port..."

    # Create directory
    mkdir -p "$BASE_DIR/$mf_name/src"

    # Create package.json
    cat > "$BASE_DIR/$mf_name/package.json" << EOF
{
  "name": "$mf_name",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port $port",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.4.1",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
EOF

    # Create vite.config.ts
    cat > "$BASE_DIR/$mf_name/vite.config.ts" << EOF
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "$mf_name",
      filename: "remoteEntry.js",
      exposes: {
        "./$component_name": "./src/$component_name.tsx",
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
    port: $port,
  },
});
EOF

    # Create tsconfig.json
    cat > "$BASE_DIR/$mf_name/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

    # Create tsconfig.node.json
    cat > "$BASE_DIR/$mf_name/tsconfig.node.json" << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
EOF

    # Create index.html
    cat > "$BASE_DIR/$mf_name/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$title Microfrontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

    # Create vite-env.d.ts
    cat > "$BASE_DIR/$mf_name/src/vite-env.d.ts" << 'EOF'
/// <reference types="vite/client" />
EOF

    # Create component
    cat > "$BASE_DIR/$mf_name/src/$component_name.tsx" << EOF
import React from "react";

const $component_name: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">$icon</span>
        <h1 className="text-2xl font-bold text-gray-900">$title</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">$title</h2>
          <p className="text-gray-700 mb-4">
            Esta é a página de $title. Aqui pode gerir e visualizar todas as funcionalidades relacionadas com $title.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-1">Funcionalidade 1</h4>
              <p className="text-blue-700 text-sm">Descrição da primeira funcionalidade de $title.</p>
            </div>

            <div className="bg-green-50 p-3 rounded border border-green-200">
              <h4 className="font-medium text-green-900 mb-1">Funcionalidade 2</h4>
              <p className="text-green-700 text-sm">Descrição da segunda funcionalidade de $title.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            $title
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Microfrontend
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            React
          </span>
        </div>
      </div>
    </div>
  );
};

export default $component_name;
EOF

    # Create main.tsx
    cat > "$BASE_DIR/$mf_name/src/main.tsx" << EOF
import React from "react";
import ReactDOM from "react-dom/client";
import $component_name from "./$component_name";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <$component_name />
  </React.StrictMode>
);
EOF

    echo "Created $mf_name successfully!"
done

echo "All microfrontends created!"
