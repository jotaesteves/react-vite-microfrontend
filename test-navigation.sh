#!/bin/bash

echo "🧪 Testing microfrontend navigation"
echo "================================="

# Test if we can start the host and a couple of microfrontends to check navigation
echo "Starting test with host + shared + sidebar-nav + inicio..."

# Kill any existing processes on our ports
for port in 3000 3008 3009 3010; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "Killing process on port $port..."
        kill -9 $(lsof -t -i:$port) 2>/dev/null || true
    fi
done

sleep 2

echo "Starting shared library..."
cd packages/shared && npm run build && npm run preview &
SHARED_PID=$!

sleep 3

echo "Starting sidebar navigation..."
cd ../mf-sidebar-nav && npm run build && npm run preview &
SIDEBAR_PID=$!

sleep 3

echo "Starting inicio microfrontend..."
cd ../mf-inicio && npm run build && npm run preview &
INICIO_PID=$!

sleep 3

echo "Starting host application..."
cd ../host && npm run dev &
HOST_PID=$!

sleep 5

echo ""
echo "✅ Test setup complete!"
echo "📱 Visit http://localhost:3000 to test navigation"
echo "🔧 Check browser console for navigation debugging"
echo ""
echo "Press any key to stop test..."
read -n 1

echo "Stopping test processes..."
kill $SHARED_PID $SIDEBAR_PID $INICIO_PID $HOST_PID 2>/dev/null || true

echo "✅ Test cleanup complete"
