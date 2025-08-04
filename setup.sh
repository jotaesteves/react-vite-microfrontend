#!/bin/bash

echo "🚀 Setting up React + Vite Micro-Frontend Architecture"
echo "=================================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is required but not installed."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

echo "Installing root dependencies..."
npm install

echo "Installing host dependencies..."
cd packages/host && npm install
cd ../..

echo "Installing header micro-frontend dependencies..."
cd packages/mf-header && npm install
cd ../..

echo "Installing footer micro-frontend dependencies..."
cd packages/mf-footer && npm install
cd ../..

echo ""
echo "✅ All dependencies installed successfully!"

echo ""
echo "🎉 Setup complete! You can now run:"
echo ""
echo "  npm run dev          # Start all applications"
echo "  npm run dev:host    # Start host app only"
echo "  npm run dev:mf1      # Start header MF only"
echo "  npm run dev:mf2      # Start footer MF only"
echo ""
echo "🌐 URLs:"
echo "  host App:  http://localhost:3000"
echo "  Header MF:  http://localhost:3001"
echo "  Footer MF:  http://localhost:3002"
echo ""
echo "📚 See DEVELOPMENT.md for more details"
