import { Platform } from 'react-native';

// Polyfill Fabric-only native function that react-native-reanimated 3.x
// calls on web where it doesn't exist (fixes "_removeFromPropsRegistry is not defined")
if (Platform.OS === 'web' && typeof globalThis._removeFromPropsRegistry === 'undefined') {
  (globalThis as any)._removeFromPropsRegistry = () => {};
}

import './global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { LanguageProvider } from './src/providers/LanguageProvider';
import { AuthProvider } from './src/providers/AuthProvider';
import { AdProvider } from './src/providers/AdProvider';
import { ToastProvider } from './src/providers/ToastProvider';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AdProvider>
                <ToastProvider>
                  <AppNavigator />
                </ToastProvider>
              </AdProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
