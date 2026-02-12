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
- **pnpm** ≥ 10
- **Expo CLI** (bundled via `npx expo`)

## Adding UI Components

This project uses [React Native Reusables](https://reactnativereusables.com) for its UI library. To add new components (e.g., avatar, checkbox, dialog), run:

```bash
pnpm dlx @react-native-reusables/cli@latest add [component]
```

Use `pnpm dlx @react-native-reusables/cli@latest add --help` to see all available options.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start Expo dev server
pnpm start

# Run on web
pnpm run web

# Run on Android
pnpm run android

# Run on iOS
pnpm run ios
```

## Available Scripts

| Script | Description |
|---|---|
| `pnpm start` | Start Expo dev server |
| `pnpm run android` | Run on Android |
| `pnpm run ios` | Run on iOS |
| `pnpm run web` | Run on web (sets `EXPO_PUBLIC_BUILD_PLATFORM=web`) |
| `pnpm test` | Run test suite |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:coverage` | Run tests with coverage report |
| `pnpm run test:ci` | CI-optimized test run |
| `pnpm run lint` | Lint source files |
| `pnpm run lint:fix` | Lint and auto-fix |
| `pnpm run format` | Format source files with Prettier |
| `pnpm run format:check` | Check formatting |

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