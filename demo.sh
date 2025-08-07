#!/bin/bash

echo "🎬 React + Vite Micro-Frontend Demo"
echo "===================================echo "This will secho "📋 Demo checklist:"
echo "  1echo "📋 Demo checklist:"
echo "  1. Visit http://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3008 to see shared library info"
echo "  3. Visit http://localhost:3001 to see header standalone"
echo "  4. Visit http://localhost:3002 to see footer standalone"
echo "  5. Visit http://localhost:3003 to see Canais e Serviços standalone"
echo "  6. Visit http://localhost:3004 to see Dados Pessoais standalone"
echo "  7. Visit http://localhost:3005 to see Histórico de Interações standalone"
echo "  8. Visit http://localhost:3006 to see Patrimônio e Produtos standalone"
echo "  9. Visit http://localhost:3007 to see Visão 360 standalone"
echo " 10. Visit http://localhost:3009 to see Sidebar Navigation standalone"
echo " 11. Try editing components in any microfrontend src/ directory"
echo " 12. Watch hot reload in both standalone and integrated views"
echo " 13. Stop a micro-frontend Ctrl+C to see error boundaries"://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3008 to see shared library (no UI)"
echo "  3. Visit http://localhost:3001 to see header standalone"
echo "  4. Visit http://localhost:3002 to see footer standalone"
echo "  5. Visit http://localhost:3003 to see Canais e Serviços standalone"
echo "  6. Visit http://localhost:3004 to see Dados Pessoais standalone"
echo "  7. Visit http://localhost:3005 to see Histórico de Interações standalone"
echo "  8. Visit http://localhost:3006 to see Patrimônio e Produtos standalone"
echo "  9. Visit http://localhost:3007 to see Visão 360 standalone"
echo " 10. Try editing components in any microfrontend src/ directory"
echo " 11. Watch hot reload in both standalone and integrated views"
echo " 12. Stop a micro-frontend (Ctrl+C) to see error boundaries""  🐚 Host application at http://localhost:3000"
echo "  📚 Shared library at http://localhost:3008"
echo "  🎯 Header micro-frontend at http://localhost:3001"
echo "  🦶 Footer micro-frontend at http://localhost:3002"
echo "  📡 Canais e Serviços micro-frontend at http://localhost:3003"
echo "  🧑‍💼 Dados Pessoais micro-frontend at http://localhost:3004"
echo "  🕑 Histórico de Interações micro-frontend at http://localhost:3005"
echo "  💰 Patrimônio e Produtos micro-frontend at http://localhost:3006"
echo "  👁️ Visão 360 micro-frontend at http://localhost:3007"
echo "  🔗 Shared library at http://localhost:3008"
echo ""
echo "📋 Demo checklist:"
echo "  1. Visit http://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3001 to see header standalone"
echo "  3. Visit http://localhost:3002 to see footer standalone"
echo "  4. Visit http://localhost:3003 to see Canais e Serviços standalone"
echo "  5. Visit http://localhost:3004 to see Dados Pessoais standalone"
echo "  6. Visit http://localhost:3005 to see Histórico de Interações standalone"
echo "  7. Visit http://localhost:3006 to see Patrimônio e Produtos standalone"
echo "  8. Visit http://localhost:3007 to see Visão 360 standalone"
echo "  9. Visit http://localhost:3008 to see Shared library info"
echo " 10. Try editing components in any microfrontend src/ directory"
echo " 11. Watch hot reload in both standalone and integrated views"
echo " 12. Stop a micro-frontend (Ctrl+C) to see error boundaries"
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

if ! check_port 3000; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3001; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3002; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3003; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3004; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3005; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3006; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3007; then
    PORTS_AVAILABLE=false
fi

if ! check_port 3009; then
    PORTS_AVAILABLE=false
fi

if [ "$PORTS_AVAILABLE" = false ]; then
    echo "❌ Some required ports are in use. Please free ports 3000-3009."
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

if [ ! -d "packages/shared/node_modules" ]; then
    echo "Installing shared library dependencies..."
    cd packages/shared && npm install && cd ../..
fi

if [ ! -d "packages/host/node_modules" ]; then
    echo "Installing host dependencies..."
    cd packages/host && npm install && cd ../..
fi

if [ ! -d "packages/mf-header/node_modules" ]; then
    echo "Installing header MF dependencies..."
    cd packages/mf-header && npm install && cd ../..
fi

if [ ! -d "packages/mf-footer/node_modules" ]; then
    echo "Installing footer MF dependencies..."
    cd packages/mf-footer && npm install && cd ../..
fi

echo "✅ Dependencies ready"

echo ""
echo "🚀 Starting micro-frontend demonstration..."
echo ""
echo "This will start:"
echo "  🐚 host application at http://localhost:3000"
echo "  🎯 Header micro-frontend at http://localhost:3001"
echo "  🦶 Footer micro-frontend at http://localhost:3002"
echo "  📡 Canais e Serviços micro-frontend at http://localhost:3003"
echo "  🧑‍💼 Dados Pessoais micro-frontend at http://localhost:3004"
echo "  🕑 Histórico de Interações micro-frontend at http://localhost:3005"
echo "  � Patrimônio e Produtos micro-frontend at http://localhost:3006"
echo "  👁️ Visão 360 micro-frontend at http://localhost:3007"
echo ""
echo "�📋 Demo checklist:"
echo "  1. Visit http://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3001 to see header standalone"
echo "  3. Visit http://localhost:3002 to see footer standalone"
echo "  4. Visit http://localhost:3003 to see Canais e Serviços standalone"
echo "  5. Visit http://localhost:3004 to see Dados Pessoais standalone"
echo "  6. Visit http://localhost:3005 to see Histórico de Interações standalone"
echo "  7. Visit http://localhost:3006 to see Patrimônio e Produtos standalone"
echo "  8. Visit http://localhost:3007 to see Visão 360 standalone"
echo "  9. Try editing components in any microfrontend src/ directory"
echo " 10. Watch hot reload in both standalone and integrated views"
echo " 11. Stop a micro-frontend (Ctrl+C) to see error boundaries"
echo ""
echo "Press Ctrl+C to stop all applications"
echo ""

# Check/install dependencies for new microfrontends
if [ ! -d "packages/mf-canais-e-servicos/node_modules" ]; then
    echo "Installing Canais e Serviços MF dependencies..."
    cd packages/mf-canais-e-servicos && npm install && cd ../..
fi
if [ ! -d "packages/mf-dados-pessoais/node_modules" ]; then
    echo "Installing Dados Pessoais MF dependencies..."
    cd packages/mf-dados-pessoais && npm install && cd ../..
fi
if [ ! -d "packages/mf-historico-interacoes/node_modules" ]; then
    echo "Installing Histórico de Interações MF dependencies..."
    cd packages/mf-historico-interacoes && npm install && cd ../..
fi
if [ ! -d "packages/mf-patrimonio-e-produtos/node_modules" ]; then
    echo "Installing Patrimônio e Produtos MF dependencies..."
    cd packages/mf-patrimonio-e-produtos && npm install && cd ../..
fi
if [ ! -d "packages/mf-visao-360/node_modules" ]; then
    echo "Installing Visão 360 MF dependencies..."
    cd packages/mf-visao-360 && npm install && cd ../..
fi
if [ ! -d "packages/mf-sidebar-nav/node_modules" ]; then
    echo "Installing Sidebar Navigation MF dependencies..."
    cd packages/mf-sidebar-nav && npm install && cd ../..
fi

echo "✅ Dependencies ready"

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
  "cd packages/mf-sidebar-nav && npm run build && npm run preview"
