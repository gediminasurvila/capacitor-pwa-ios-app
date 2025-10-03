# Capacitor PWA App

A modern cross-platform app built with Vite, React, and Capacitor that works as both a Progressive Web App (PWA) and native iOS app.

## Features

- 📱 **Cross-platform**: Works on web, iOS, and Android
- 🔄 **PWA Support**: Offline functionality, installable, service worker
- 📷 **Camera**: Take photos and select from gallery
- 💾 **Storage**: Persistent key-value storage
- 📍 **Geolocation**: GPS location with real-time tracking
- 🔔 **Push Notifications**: Local and push notifications
- 🌐 **Network Status**: Online/offline detection
- 📱 **Responsive Design**: Clean, minimal UI that works on all devices

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Xcode (for iOS development)
- iOS Simulator or physical iOS device

### Installation

```bash
# Install dependencies
npm install

# Initialize Capacitor
npx cap init

# Add iOS platform
npm run add:ios
```

### Development

```bash
# Start development server
npm run dev

# Build and sync for iOS
npm run ios:build

# Open App in XCode
npx cap open ios

# Run on iOS simulator
npm run ios
```

### PWA Testing

1. Run `npm run build && npm run preview`
2. Open in browser and test PWA features
3. Use browser dev tools to simulate offline mode
4. Test "Add to Home Screen" functionality

### iOS Setup

1. Open `ios/App/App.xcworkspace` in Xcode
2. Configure signing & capabilities
3. Add required permissions in `Info.plist`:
   - Camera usage
   - Location access
   - Push notifications

### Required iOS Permissions

Add these to `ios/App/App/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to take photos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access for geolocation features</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select images</string>
```

## Architecture

- **Frontend**: React 18 with Vite
- **Mobile**: Capacitor 5
- **PWA**: Vite PWA plugin with Workbox
- **Storage**: Capacitor Preferences API
- **Styling**: Vanilla CSS with responsive design

## Testing Features

Each feature card in the app allows you to test:

1. **Camera**: Take photos or select from gallery
2. **Storage**: Set, get, remove key-value pairs
3. **Geolocation**: Get current position or watch location changes
4. **Push Notifications**: Register for push and send local notifications
5. **Network**: Automatic online/offline status detection

## Deployment

### Web (PWA)

```bash
npm run build
# Deploy dist/ folder to your web server
```

### iOS App Store

1. Build in Xcode with Release configuration
2. Archive and upload to App Store Connect
3. Configure app metadata and submit for review

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+

## License

MIT
