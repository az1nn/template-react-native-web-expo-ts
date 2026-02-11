# Bootstrap Implementation Plan

Full step-by-step plan to go from documentation-only state to a working React Native + Expo + Web template app, based on the specifications in [BOOTSTRAP.md](./BOOTSTRAP.md).

---

## Current State

- `README.md` — project title only
- `BOOTSTRAP.md` — 720-line reference guide with all technology decisions, package versions, and configuration patterns
- **No source code, no config files, no `package.json`**

## Target State

A fully scaffolded, buildable, testable, and lintable cross-platform (iOS / Android / Web) React Native template app with:
- Expo managed workflow
- TypeScript strict mode
- React Navigation (native stack)
- Context API state management
- i18n, auth stubs, ad stubs, realtime stubs, haptics
- Jest + React Testing Library test suite
- ESLint + Prettier code quality tooling
- Placeholder screens (Home, Details) demonstrating the stack

---

## Phase 1 — Project Initialization & Configuration

All configuration files, no source code yet. The goal is a project that installs and builds.

### Step 1.1: Create `package.json`

Create the root `package.json` with:
- `name`: `"template-react-native-web-expo-ts"`
- `version`: `"1.0.0"`
- `main`: `"expo/AppEntry"`
- All production dependencies from BOOTSTRAP.md §npm-packages (exact versions specified)
- All dev dependencies from BOOTSTRAP.md §npm-packages
- All scripts from BOOTSTRAP.md §Scripts:
  - `start`, `android`, `ios`, `web`
  - `test`, `test:watch`, `test:coverage`, `test:ci`
  - `lint`, `lint:fix`, `format`, `format:check`

### Step 1.2: Create `tsconfig.json`

Per BOOTSTRAP.md §TypeScript:
- Extend `expo/tsconfig.base`
- Enable `strict: true`
- Set `baseUrl: "."`
- Configure path alias `@/*` → `src/*`
- Include `**/*.ts`, `**/*.tsx`

### Step 1.3: Create `babel.config.js`

Per BOOTSTRAP.md §Babel:
- Presets: `babel-preset-expo` (with `flow: false`), `@babel/preset-flow`
- Plugins: `react-native-reanimated/plugin` (**must be last**)

### Step 1.4: Create `metro.config.js`

Per BOOTSTRAP.md §Metro-Bundler:
- Extend Expo default config
- Add `tsx`, `ts` to `sourceExts`
- Custom `resolveRequest` for web platform:
  - Resolve `../Utilities/Platform` → `react-native-web/dist/exports/Platform`
  - Empty-resolve `react-native-google-mobile-ads` on web

### Step 1.5: Create `app.config.js`

Per BOOTSTRAP.md §Expo-Configuration:
- Dynamic export function
- `EXPO_PUBLIC_BUILD_PLATFORM` env var check to exclude native-only plugins on web
- Full `expo` config object: name, slug, version, orientation, icon, splash, assetBundlePatterns, ios, android, web sections
- Plugins array conditionally includes `@react-native-google-signin/google-signin`

### Step 1.6: Create placeholder assets

Create `assets/` directory with placeholder files:
- `assets/icon.png` (1024x1024 placeholder)
- `assets/splash.png` (1284x2778 placeholder)
- `assets/adaptive-icon.png` (1024x1024 placeholder)
- `assets/favicon.png` (48x48 placeholder)

These can be minimal single-color PNGs — they exist to prevent build errors.

### Step 1.7: Create `.gitignore`

Standard Expo/RN gitignore:
- `node_modules/`
- `.expo/`
- `dist/`
- `*.jks`, `*.p8`, `*.p12`, `*.key`, `*.mobileprovision`
- `*.orig.*`
- `web-build/`
- `.env` (prevent secrets from being committed)
- `google-services.json`, `GoogleService-Info.plist`
- `coverage/`

### Step 1.8: Install dependencies

Run `npm install` to generate `node_modules/` and `package-lock.json`.

**Checkpoint**: `npx expo doctor` should report no critical issues. `npx tsc --noEmit` should succeed (once source files exist).

---

## Phase 2 — Source Directory Structure

Create the `src/` directory tree. No implementation logic yet — just empty barrel files and directory scaffolding.

### Step 2.1: Create directory layout

```
src/
├── components/          # Shared UI components
├── screens/             # Screen components (one per route)
│   ├── HomeScreen.tsx
│   └── DetailsScreen.tsx
├── navigation/          # Navigator definitions & route types
│   └── AppNavigator.tsx
├── providers/           # Context providers
│   ├── LanguageProvider.tsx
│   ├── AuthProvider.tsx
│   ├── AdProvider.tsx
│   └── ToastProvider.tsx
├── hooks/               # Custom hooks
├── services/            # External service clients (socket.io, storage)
├── locales/             # i18n translation files
│   ├── en.json
│   └── pt-BR.json
├── i18n/                # i18n initialization
│   └── index.ts
├── types/               # Shared TypeScript types
│   └── navigation.ts
└── utils/               # Utility functions
    └── platform.ts
```

---

## Phase 3 — Core App Entry & Navigation

Wire up the app entry point and navigation so the app can boot and render screens.

### Step 3.1: Create `App.tsx` (project root)

- Import `GestureHandlerRootView` wrapping the full tree
- Import and nest providers in dependency order (per BOOTSTRAP.md §Provider-Composition):
  1. `ErrorBoundary` (simple class component)
  2. `GestureHandlerRootView`
  3. `LanguageProvider`
  4. `AuthProvider`
  5. `AdProvider`
  6. `ToastProvider`
  7. `AppNavigator`

### Step 3.2: Create navigation types — `src/types/navigation.ts`

```ts
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
};
```

Declare global `ReactNavigation` namespace for type-safe `useNavigation`.

### Step 3.3: Create `src/navigation/AppNavigator.tsx`

- `NavigationContainer` wrapping a `NativeStackNavigator`
- Two screens: `Home`, `Details`
- Screen options: `headerShown: false`, `animation: 'slide_from_right'`

### Step 3.4: Create placeholder screens

**`src/screens/HomeScreen.tsx`**
- Simple view with app title text
- Button navigating to `Details` screen with a sample `id`
- Demonstrate `useTranslation` hook for i18n text

**`src/screens/DetailsScreen.tsx`**
- Read `id` param from route
- Display the id
- Back button to go home

**Checkpoint**: `npx expo start --web` should launch and render the Home screen. Navigation between screens should work.

---

## Phase 4 — Context Providers (State Management)

Implement each provider following the Context pattern from BOOTSTRAP.md §State-Management.

### Step 4.1: `src/providers/LanguageProvider.tsx`

- Wrap i18n initialization
- Expose `language`, `setLanguage` via context
- Initialize i18next on mount (device language detection per BOOTSTRAP.md §i18n)
- Store language preference in AsyncStorage

### Step 4.2: `src/providers/AuthProvider.tsx`

- State: `user`, `isAuthenticated`, `isLoading`
- Methods: `signIn`, `signOut`
- Platform check: use `@react-native-google-signin/google-signin` on native, stub/no-op on web
- Persist auth state via AsyncStorage

### Step 4.3: `src/providers/AdProvider.tsx`

- State: `adsEnabled`, `isLoaded`
- Methods: `showBanner`, `showRewarded`, `showInterstitial` (stubs)
- Platform check: no-op on web, real integration on native
- Use test ad unit IDs for development

### Step 4.4: `src/providers/ToastProvider.tsx`

- Simple toast/notification system
- State: message queue
- Methods: `showToast(message, type)`
- Renders a floating toast component with Reanimated fade animation

**Checkpoint**: All providers mount without errors. Provider hooks return expected default values.

---

## Phase 5 — i18n Setup

### Step 5.1: Create translation files

**`src/locales/en.json`**
```json
{
  "common": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "back": "Back"
  },
  "home": {
    "title": "Welcome",
    "subtitle": "React Native Template",
    "goToDetails": "View Details"
  },
  "details": {
    "title": "Details",
    "idLabel": "Item ID"
  }
}
```

**`src/locales/pt-BR.json`** — Portuguese translations with the same key structure.

### Step 5.2: Create `src/i18n/index.ts`

Per BOOTSTRAP.md §Internationalization:
- Initialize i18next with `initReactI18next`
- Load `en` and `pt-BR` resources
- Set `fallbackLng: 'en'`
- `compatibilityJSON: 'v4'`
- `interpolation: { escapeValue: false }`

### Step 5.3: Create `src/utils/platform.ts`

- `getDeviceLanguage()` utility per BOOTSTRAP.md §Device-Language-Detection
- Platform-specific logic for iOS, Android, Web

**Checkpoint**: `useTranslation()` works in screens. Changing language re-renders translated strings.

---

## Phase 6 — Services & Utilities

### Step 6.1: Create `src/services/storage.ts`

Typed wrapper around AsyncStorage:
- `getItem<T>(key): Promise<T | null>`
- `setItem<T>(key, value): Promise<void>`
- `removeItem(key): Promise<void>`
- JSON serialization/deserialization
- Key namespacing utility

### Step 6.2: Create `src/services/socket.ts`

Socket.io client wrapper per BOOTSTRAP.md §Realtime:
- `createSocket(url)` factory
- Connection lifecycle methods: `connect`, `disconnect`
- Typed event emitter/listener pattern
- Designed to be used inside a custom hook

### Step 6.3: Create `src/hooks/useSocket.ts`

Custom hook wrapping socket lifecycle:
- Connect on mount, disconnect on unmount
- Expose `socket`, `isConnected`, `emit`, `on`

### Step 6.4: Create `src/hooks/useHaptics.ts`

Thin wrapper around `expo-haptics`:
- `triggerImpact(style)`, `triggerNotification(type)`, `triggerSelection()`
- Safe to call on all platforms (no-op on web)

**Checkpoint**: Storage service reads/writes. Socket hook compiles. Haptics hook compiles.

---

## Phase 7 — Error Boundary

### Step 7.1: Create `src/components/ErrorBoundary.tsx`

- Class component implementing `componentDidCatch`
- Renders a fallback UI with error message and retry button
- Wraps the entire app in `App.tsx`

---

## Phase 8 — Testing Infrastructure

### Step 8.1: Create `jest.config.js`

Per BOOTSTRAP.md §Jest-Configuration:
- Preset: `jest-expo`
- Setup files: `jest.setup.js`
- Module file extensions: `ts, tsx, js, jsx, json`
- Coverage from `src/**/*.{ts,tsx}` excluding `.d.ts` and `types/`
- Transform: `babel-jest` for `[jt]sx?`
- `transformIgnorePatterns` whitelisting all RN/Expo packages
- `moduleNameMapper` for `@/*` alias and image stub

### Step 8.2: Create `jest.setup.js`

Mock setup for native modules:
- `react-native` core modules (Animated, Platform, etc.)
- `@react-native-async-storage/async-storage`
- `@react-native-google-signin/google-signin`
- `expo-haptics`
- `react-native-reanimated` (with `jest.mock`)
- `react-native-gesture-handler`
- `uuid`
- `react-native-safe-area-context`
- `@react-navigation/native`

### Step 8.3: Create `__mocks__/fileMock.js`

```js
module.exports = 'test-file-stub';
```

### Step 8.4: Write initial test suite

**`src/screens/__tests__/HomeScreen.test.tsx`**
- Renders without crashing
- Displays expected translated text
- Navigation button exists and is pressable

**`src/providers/__tests__/LanguageProvider.test.tsx`**
- Provider renders children
- `useLanguage` hook returns expected defaults
- Language switching updates context value

**`src/services/__tests__/storage.test.ts`**
- `setItem` stores a value
- `getItem` retrieves stored value
- `removeItem` deletes value
- Handles null/missing keys

**`src/hooks/__tests__/useHaptics.test.ts`**
- Hook returns expected methods
- Methods are callable without errors

**Checkpoint**: `npm test` runs all tests and passes. `npm run test:coverage` generates a coverage report.

---

## Phase 9 — ESLint & Prettier Configuration

### Step 9.1: Create `.eslintrc.js`

Per BOOTSTRAP.md §ESLint:
- Extends: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react/recommended`, `plugin:react-hooks/recommended`
- Parser: `@typescript-eslint/parser`
- Plugins: `@typescript-eslint`, `react`, `react-hooks`
- Rules: `react-in-jsx-scope: off`, `prop-types: off`, `no-explicit-any: warn`, `explicit-module-boundary-types: off`, hooks rules
- Settings: `react.version: 'detect'`
- Env: `browser`, `es2021`, `node`

### Step 9.2: Create `.prettierrc`

Per BOOTSTRAP.md §Prettier:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Step 9.3: Format all source files

Run `npm run format` to apply Prettier to all existing source files.

### Step 9.4: Lint all source files

Run `npm run lint` and fix any reported issues.

**Checkpoint**: `npm run lint` exits with 0 errors. `npm run format:check` passes.

---

## Phase 10 — Final Validation & Cleanup

### Step 10.1: TypeScript compilation check

Run `npx tsc --noEmit` — must produce zero errors.

### Step 10.2: Full test run

Run `npm test` — all tests pass.

### Step 10.3: Lint + format check

Run `npm run lint && npm run format:check` — clean output.

### Step 10.4: Web build smoke test

Run `EXPO_PUBLIC_BUILD_PLATFORM=web npx expo start --web` — app loads in browser, Home screen renders, navigation works.

### Step 10.5: Update `README.md`

Replace the single-line README with:
- Project description
- Prerequisites (Node, npm, Expo CLI)
- Quick start commands (`npm install`, `npm start`, `npm run web`)
- Available scripts table
- Project structure overview
- Link to BOOTSTRAP.md for detailed reference

---

## Dependency Graph

Phases must execute in this order due to dependencies:

```
Phase 1 (Config)
  └─→ Phase 2 (Directory Structure)
        └─→ Phase 3 (App Entry & Navigation)
        │     └─→ Phase 4 (Providers) ─→ Phase 5 (i18n)
        │     └─→ Phase 6 (Services & Hooks)
        │     └─→ Phase 7 (Error Boundary)
        └─→ Phase 8 (Testing) — can start after Phase 3
        └─→ Phase 9 (Lint/Format) — can start after Phase 2
              └─→ Phase 10 (Validation) — requires all above
```

Phases 4, 5, 6, 7 can be worked in parallel once Phase 3 is complete.
Phases 8 and 9 can begin as soon as there is source code to test/lint.

---

## File Manifest

Complete list of files to be created:

```
# Root config
package.json
tsconfig.json
babel.config.js
metro.config.js
app.config.js
jest.config.js
jest.setup.js
.eslintrc.js
.prettierrc
.gitignore
App.tsx

# Assets
assets/icon.png
assets/splash.png
assets/adaptive-icon.png
assets/favicon.png

# Mocks
__mocks__/fileMock.js

# Source — Types
src/types/navigation.ts

# Source — Navigation
src/navigation/AppNavigator.tsx

# Source — Screens
src/screens/HomeScreen.tsx
src/screens/DetailsScreen.tsx

# Source — Providers
src/providers/LanguageProvider.tsx
src/providers/AuthProvider.tsx
src/providers/AdProvider.tsx
src/providers/ToastProvider.tsx

# Source — i18n
src/i18n/index.ts
src/locales/en.json
src/locales/pt-BR.json

# Source — Services
src/services/storage.ts
src/services/socket.ts

# Source — Hooks
src/hooks/useSocket.ts
src/hooks/useHaptics.ts

# Source — Utils
src/utils/platform.ts

# Source — Components
src/components/ErrorBoundary.tsx

# Tests
src/screens/__tests__/HomeScreen.test.tsx
src/providers/__tests__/LanguageProvider.test.tsx
src/services/__tests__/storage.test.ts
src/hooks/__tests__/useHaptics.test.ts
```

**Total: ~35 files** to create from scratch.

---

## Success Criteria

| Criteria | Validation Command |
|---|---|
| Dependencies install | `npm install` exits 0 |
| TypeScript compiles | `npx tsc --noEmit` exits 0 |
| Tests pass | `npm test` exits 0 |
| Lint passes | `npm run lint` exits 0 |
| Formatting passes | `npm run format:check` exits 0 |
| Web app loads | `npm run web` renders Home screen |
| Navigation works | Can navigate Home ↔ Details on web |
| i18n works | Translated strings render in screens |
| Providers mount | No runtime errors from Context providers |
