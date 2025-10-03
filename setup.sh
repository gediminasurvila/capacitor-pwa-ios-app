#!/bin/bash

echo "🚀 Setting up Capacitor PWA App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize Capacitor
echo "⚡ Initializing Capacitor..."
npx cap init "Capacitor PWA App" "com.example.capacitorpwa" --web-dir=dist

# Add iOS platform
echo "📱 Adding iOS platform..."
npx cap add ios

# Create placeholder PWA icons (you should replace these with real icons)
echo "🎨 Creating placeholder PWA icons..."

# Create a simple colored square as placeholder icon
cat > public/pwa-192x192.png << 'EOF'
# This is a placeholder - replace with actual 192x192 PNG icon
EOF

cat > public/pwa-512x512.png << 'EOF'
# This is a placeholder - replace with actual 512x512 PNG icon
EOF

cat > public/apple-touch-icon.png << 'EOF'
# This is a placeholder - replace with actual 180x180 PNG icon
EOF

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Replace placeholder icons in public/ with real PNG icons"
echo "2. Run 'npm run dev' to start development server"
echo "3. Run 'npm run ios:build' to build and run on iOS"
echo "4. Open ios/App/App.xcworkspace in Xcode for iOS development"
echo ""
echo "📖 See README.md for detailed instructions"