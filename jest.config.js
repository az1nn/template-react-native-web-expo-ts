module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*((jest-)?react-native|@react-native(-community)?|'
    + '@react-native/.*|expo(nent)?|@expo(nent)?/.*|react-navigation|'
    + '@react-navigation/.*|@unimodules/.*|unimodules|react-native-svg|'
    + 'react-native-reanimated|react-native-gesture-handler|'
    + 'react-native-safe-area-context|react-native-screens|'
    + 'react-native-get-random-values|react-native-google-mobile-ads|'
    + 'uuid|@shopify/react-native-skia|expo-haptics|expo-constants|'
    + 'nativewind|@rn-primitives|lucide-react-native|class-variance-authority|'
    + 'clsx|tailwind-merge))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
