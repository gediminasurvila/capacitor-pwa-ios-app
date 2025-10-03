#!/bin/bash

echo "🚀 Installing and running Capacitor PWA App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Installation complete!"
echo ""
echo "🌐 To run as PWA (web):"
echo "   npm run dev"
echo ""
echo "📱 To run on iOS:"
echo "   npm run ios:build"
echo ""
echo "🔧 To setup iOS development:"
echo "   1. Run: npx cap add ios"
echo "   2. Open: ios/App/App.xcworkspace in Xcode"
echo "   3. Configure signing and run"