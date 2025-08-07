#!/bin/bash

echo "🎬 React + Vite Micro-Frontend Demo"
echo "==================================="
echo ""
echo "This demo starts all micro-frontends and the host application."
echo "Each micro-frontend runs independently and can be developed in isolation."
echo ""
echo "This will start:"
echo "  🐚 Host application at http://localhost:3000"
echo "  📚 Shared library at http://localhost:3008"
echo "  🎯 Header micro-frontend at http://localhost:3001"
echo "  🦶 Footer micro-frontend at http://localhost:3002"
echo "  📡 Canais e Serviços micro-frontend at http://localhost:3003"
echo "  🧑‍💼 Dados Pessoais micro-frontend at http://localhost:3004"
echo "  🕑 Histórico de Interações micro-frontend at http://localhost:3005"
echo "  💰 Patrimônio e Produtos micro-frontend at http://localhost:3006"
echo "  👁️ Visão 360 micro-frontend at http://localhost:3007"
echo "  🔗 Sidebar Navigation micro-frontend at http://localhost:3009"
echo "  🏠 Início micro-frontend at http://localhost:3010"
echo "  📁 Registos micro-frontend at http://localhost:3011"
echo "  📞 Outbounds micro-frontend at http://localhost:3012"
echo "  �️ Vendas micro-frontend at http://localhost:3013"
echo "  � Scripts micro-frontend at http://localhost:3014"
echo "  � Documentação micro-frontend at http://localhost:3015"
echo "  � KPI's micro-frontend at http://localhost:3016"
echo "  ⚙️ Definições micro-frontend at http://localhost:3017"
echo "  � Pesquisa micro-frontend at http://localhost:3018"
echo ""
echo "📋 Demo checklist:"
echo "  1. Visit http://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3008 to see shared library info"
echo "  3. Visit any of the standalone micro-frontends (ports 3001-3018)"
echo "  4. Try editing components in any microfrontend src/ directory"
echo "  5. Watch hot reload in both standalone and integrated views"
echo "  6. Stop a micro-frontend (Ctrl+C) to see error boundaries"
echo "  7. Use the sidebar navigation to test React Router integration"
echo ""
echo "Press Ctrl+C to stop all applications"
echo ""

if ! command -v concurrently &> /dev/null; then
    echo "Installing 'concurrently' globally (required to run all microfrontends in parallel)..."
    npm install -g concurrently
fi

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check if required ports are available
echo "🔍 Checking ports..."
PORTS_AVAILABLE=true

for port in {3000..3018}; do
    if ! check_port $port; then
        PORTS_AVAILABLE=false
    fi
done

if [ "$PORTS_AVAILABLE" = false ]; then
    echo "❌ Some required ports are in use. Please free ports 3000-3018."
    exit 1
fi

echo "✅ All ports available"

# Check if dependencies are installed
echo ""
echo "📦 Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

# List of all packages
packages=(
    "shared"
    "host"
    "mf-header"
    "mf-footer"
    "mf-canais-e-servicos"
    "mf-dados-pessoais"
    "mf-historico-interacoes"
    "mf-patrimonio-e-produtos"
    "mf-visao-360"
    "mf-sidebar-nav"
    "mf-inicio"
    "mf-registos"
    "mf-outbounds"
    "mf-vendas"
    "mf-scripts"
    "mf-documentacao"
    "mf-kpis"
    "mf-definicoes"
    "mf-pesquisa"
)

# Install dependencies for each package
for package in "${packages[@]}"; do
    if [ ! -d "packages/$package/node_modules" ]; then
        echo "Installing $package dependencies..."
        cd packages/$package && npm install && cd ../..
    fi
done

echo "✅ Dependencies ready"

echo ""
echo "🚀 Starting micro-frontend demonstration..."
echo ""

# Start all applications in parallel
concurrently \
  "cd packages/host && npm run dev" \
  "cd packages/shared && npm run build && npm run preview" \
  "cd packages/mf-header && npm run build && npm run preview" \
  "cd packages/mf-footer && npm run build && npm run preview" \
  "cd packages/mf-canais-e-servicos && npm run build && npm run preview" \
  "cd packages/mf-dados-pessoais && npm run build && npm run preview" \
  "cd packages/mf-historico-interacoes && npm run build && npm run preview" \
  "cd packages/mf-patrimonio-e-produtos && npm run build && npm run preview" \
  "cd packages/mf-visao-360 && npm run build && npm run preview" \
  "cd packages/mf-sidebar-nav && npm run build && npm run preview" \
  "cd packages/mf-inicio && npm run build && npm run preview" \
  "cd packages/mf-registos && npm run build && npm run preview" \
  "cd packages/mf-outbounds && npm run build && npm run preview" \
  "cd packages/mf-vendas && npm run build && npm run preview" \
  "cd packages/mf-scripts && npm run build && npm run preview" \
  "cd packages/mf-documentacao && npm run build && npm run preview" \
  "cd packages/mf-kpis && npm run build && npm run preview" \
  "cd packages/mf-definicoes && npm run build && npm run preview" \
  "cd packages/mf-pesquisa && npm run build && npm run preview"
