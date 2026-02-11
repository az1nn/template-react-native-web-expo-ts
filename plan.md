# Plan: Dark/Light Mode Switch + Side Menu (Web & Mobile)

## Current State

- **Styling**: NativeWind v4 + Tailwind CSS with CSS variables for theming. Light and dark color tokens already defined in `global.css` (`:root` for light, `.dark` for dark), but no runtime mechanism to toggle between them.
- **Navigation**: `@react-navigation/native-stack` with a simple stack (`Home`, `Details`). No drawer or side menu exists.
- **Provider pattern**: The project uses React Context providers (`LanguageProvider`, `AuthProvider`, etc.) chained in `App.tsx`. The new `ThemeProvider` will follow this established pattern.
- **Icons**: `lucide-react-native` is already installed.
- **Storage**: `@react-native-async-storage/async-storage` with a `@app:` namespace convention (see `src/services/storage.ts`).
- **i18n**: `react-i18next` with `en.json` and `pt-BR.json` locale files.

---

## Step 1 — Install `@react-navigation/drawer` + dependencies

**Why**: The drawer navigator is the standard React Navigation solution for side menus. It works on both native (gesture-based) and web (animated panel).

```bash
npx expo install @react-navigation/drawer react-native-reanimated
```

After installing, add the `react-native-reanimated/plugin` to `babel.config.js` (must be the **last** plugin in the list).

**Files changed:**
- `package.json` (auto)
- `babel.config.js` — add Reanimated Babel plugin

---

## Step 2 — Enable NativeWind dark mode toggling

NativeWind v4 supports dark mode via the `darkMode` config in `tailwind.config.js`. The project already has `.dark` CSS variables in `global.css`, but the Tailwind config doesn't declare a `darkMode` strategy.

**Files changed:**
- `tailwind.config.js` — add `darkMode: 'class'` so that NativeWind respects the `.dark` class on the root element.

This allows using `dark:` prefixed Tailwind utilities that automatically resolve to the CSS variables defined under `.dark` in `global.css`.

---

## Step 3 — Create `ThemeProvider`

A new provider following the same pattern as `LanguageProvider`: React Context + AsyncStorage persistence + system preference detection.

**New file:** `src/providers/ThemeProvider.tsx`

**Behavior:**
- Exposes `theme` (`'light' | 'dark'`), `setTheme`, and `isDark` boolean via context.
- On mount: loads the stored preference from `AsyncStorage` (key `@app:theme`). If none stored, reads the system preference via `Appearance.getColorScheme()` (React Native API — works on iOS, Android, and web).
- On change: persists choice to `AsyncStorage`, and applies/removes the `dark` class on the NativeWind root using `useColorScheme()` from `nativewind` (or the `colorScheme` prop on the root `View`).
- Exports a `useTheme` hook.

**Files changed:**
- `src/providers/ThemeProvider.tsx` (new)

---

## Step 4 — Create the Drawer Navigator + Side Menu content

Replace the current `NativeStackNavigator` in `AppNavigator.tsx` with a **Drawer Navigator** that wraps the existing stack. This preserves the stack navigation within screens while adding the side menu.

### 4a — Drawer Navigator setup

**File changed:** `src/navigation/AppNavigator.tsx`

- Create a `Drawer.Navigator` using `createDrawerNavigator()`.
- Render a single drawer screen called `"Main"` that contains the existing `Stack.Navigator` (Home → Details).
- This gives a side menu accessible via swipe (mobile) or hamburger button (both platforms).
- Pass `drawerContent` prop to render the custom side menu component (Step 4b).

### 4b — Custom Drawer Content component

**New file:** `src/components/DrawerContent.tsx`

The custom drawer content includes:
1. **App header/branding** — App name or logo at the top.
2. **Navigation links** — Home (and any future screens). Uses `DrawerItemList` or manual `Pressable` items with icons from `lucide-react-native`.
3. **Theme toggle** — A row with a sun/moon icon and a switch (`Switch` from React Native) or a pressable row to toggle dark/light mode. Uses the `useTheme` hook from Step 3.
4. **Language selector** — A row to switch language (re-uses existing `useLanguage` hook), keeping feature parity with what the app already supports.
5. Proper `SafeAreaView` wrapping and NativeWind styling to respect the current theme.

**Files changed:**
- `src/components/DrawerContent.tsx` (new)

---

## Step 5 — Add hamburger menu button to screens

Since headers are currently hidden (`headerShown: false`), we need a way to open the drawer.

**Approach:** Add a small floating hamburger/menu button in the top-left corner of each screen (or in a shared layout wrapper). This uses `navigation.openDrawer()` from `@react-navigation/drawer`.

**Option chosen:** Create a reusable `MenuButton` component that screens can include, or add a simple header bar with a menu icon.

**New file:** `src/components/ui/menu-button.tsx`

- Renders a `Pressable` with a `Menu` icon from `lucide-react-native`.
- Calls `navigation.openDrawer()` on press.
- Absolutely positioned or placed in a top bar.

**Files changed:**
- `src/components/ui/menu-button.tsx` (new)
- `src/screens/HomeScreen.tsx` — add MenuButton to the layout
- `src/screens/DetailsScreen.tsx` — add MenuButton to the layout

---

## Step 6 — Wire ThemeProvider into App.tsx

Insert `ThemeProvider` into the provider chain in `App.tsx`, wrapping the tree so that all components (including drawer content and screens) have access to the theme context.

**Files changed:**
- `App.tsx` — add `ThemeProvider` to the provider chain, add the reanimated import at the top (`import 'react-native-reanimated'` — required before any gesture handler usage by drawer).

---

## Step 7 — Add i18n keys for new UI strings

Add translation keys for the side menu and theme toggle labels.

**Files changed:**
- `src/locales/en.json` — add keys: `sidemenu.home`, `sidemenu.theme`, `sidemenu.darkMode`, `sidemenu.lightMode`, `sidemenu.language`
- `src/locales/pt-BR.json` — add corresponding Portuguese translations

---

## Step 8 — Update navigation types

**Files changed:**
- `src/types/navigation.ts` — add drawer param list type (`DrawerParamList`) with `Main` route, and update the global `ReactNavigation` declaration if needed.

---

## Step 9 — Verify & test

- Run `npm run lint` and `npm run test` to ensure no regressions.
- Fix any lint or type errors.
- Validate the app starts on web (`npm run web`) without crashing.

---

## Summary of all file changes

| File | Action |
|------|--------|
| `package.json` | Modified (new deps via expo install) |
| `babel.config.js` | Modified (add reanimated plugin) |
| `tailwind.config.js` | Modified (add `darkMode: 'class'`) |
| `src/providers/ThemeProvider.tsx` | **New** |
| `src/navigation/AppNavigator.tsx` | Modified (drawer wrapping stack) |
| `src/components/DrawerContent.tsx` | **New** |
| `src/components/ui/menu-button.tsx` | **New** |
| `src/screens/HomeScreen.tsx` | Modified (add menu button) |
| `src/screens/DetailsScreen.tsx` | Modified (add menu button) |
| `src/types/navigation.ts` | Modified (drawer types) |
| `src/locales/en.json` | Modified (new keys) |
| `src/locales/pt-BR.json` | Modified (new keys) |
| `App.tsx` | Modified (ThemeProvider + reanimated import) |

---

## Architecture Diagram

```
App.tsx
 └─ ErrorBoundary
     └─ GestureHandlerRootView
         └─ ThemeProvider          ← NEW
             └─ LanguageProvider
                 └─ AuthProvider
                     └─ AdProvider
                         └─ ToastProvider
                             └─ AppNavigator
                                  └─ DrawerNavigator  ← NEW (wraps stack)
                                      ├─ DrawerContent ← NEW (side menu)
                                      └─ StackNavigator
                                           ├─ HomeScreen (+ MenuButton)
                                           └─ DetailsScreen (+ MenuButton)
```

## Risks & Considerations

- **react-native-reanimated** requires a Babel plugin and may need a Metro cache clear (`npx expo start -c`) after installation.
- NativeWind v4 dark mode with `class` strategy requires that the root element receives the `dark` className. The `ThemeProvider` must apply this correctly for both web (`<html>` class) and native (NativeWind's `useColorScheme` or `vars` approach).
- The drawer gesture (swipe from left edge) may conflict with the native stack's back gesture on iOS. The drawer can be configured with `swipeEdgeWidth` to limit the gesture zone, or disabled on the Details screen.
