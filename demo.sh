#!/bin/bash

echo "🎬 React + Vite Micro-Frontend Demo"
echo "==================================="

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

if [ "$PORTS_AVAILABLE" = false ]; then
    echo "❌ Some required ports are in use. Please free ports 3000, 3001, and 3002."
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
echo ""
echo "📋 Demo checklist:"
echo "  1. Visit http://localhost:3000 to see integrated app"
echo "  2. Visit http://localhost:3001 to see header standalone"
echo "  3. Visit http://localhost:3002 to see footer standalone"
echo "  4. Try editing components in packages/mf-header/src/Header.tsx"
echo "  5. Watch hot reload in both standalone and integrated views"
echo "  6. Stop a micro-frontend (Ctrl+C) to see error boundaries"
echo ""
echo "Press Ctrl+C to stop all applications"
echo ""

# Start all applications
npm run dev
