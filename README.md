# Template React Native Web Expo TypeScript

A fully scaffolded, cross-platform (iOS / Android / Web) React Native template app built with Expo, TypeScript, and modern tooling.

## Features

- **Expo managed workflow** — no ejected native projects
- **TypeScript** in strict mode with `@/*` path alias
- **React Navigation** (native stack) with type-safe routes
- **Context API** state management (Language, Auth, Ads, Toast)
- **i18n** — English & Portuguese (device language auto-detection)
- **Auth stub** — Google Sign-In on native, guest mode on web
- **Ad stub** — AdMob placeholders (banner, rewarded, interstitial)
- **Realtime** — Socket.io client wrapper & hook
- **Haptics** — `expo-haptics` with web-safe no-op
- **Error Boundary** with fallback UI
- **Jest + React Testing Library** test suite
- **ESLint + Prettier** code quality tooling

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Expo CLI** (bundled via `npx expo`)

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Expo dev server
npm start

# Run on web
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run on web (sets `EXPO_PUBLIC_BUILD_PLATFORM=web`) |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | CI-optimized test run |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting |

## Project Structure

```
├── App.tsx                    # Root component (provider composition)
├── app.config.js              # Expo dynamic config
├── babel.config.js            # Babel presets & plugins
├── metro.config.js            # Metro bundler (web overrides)
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Native module mocks
├── assets/                    # App icons & splash screen
└── src/
    ├── components/            # Shared UI components
    │   └── ErrorBoundary.tsx
    ├── screens/               # Screen components
    │   ├── HomeScreen.tsx
    │   └── DetailsScreen.tsx
    ├── navigation/            # Navigator definitions
    │   └── AppNavigator.tsx
    ├── providers/             # Context providers
    │   ├── LanguageProvider.tsx
    │   ├── AuthProvider.tsx
    │   ├── AdProvider.tsx
    │   └── ToastProvider.tsx
    ├── hooks/                 # Custom hooks
    │   ├── useSocket.ts
    │   └── useHaptics.ts
    ├── services/              # External service clients
    │   ├── storage.ts
    │   └── socket.ts
    ├── i18n/                  # i18n initialization
    │   └── index.ts
    ├── locales/               # Translation files
    │   ├── en.json
    │   └── pt-BR.json
    ├── types/                 # Shared TypeScript types
    │   └── navigation.ts
    └── utils/                 # Utility functions
        └── platform.ts
```

## Detailed Reference

See [BOOTSTRAP.md](./BOOTSTRAP.md) for the full technology decisions, package versions, and configuration patterns.