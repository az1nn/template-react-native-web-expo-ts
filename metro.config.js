const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Ensure react-native-css-interop cache file exists before Metro hashes it
const cssInteropCacheDir = path.join(__dirname, 'node_modules', 'react-native-css-interop', '.cache');
fs.mkdirSync(cssInteropCacheDir, { recursive: true });
const cssInteropCacheFile = path.join(cssInteropCacheDir, 'web.css');
if (!fs.existsSync(cssInteropCacheFile)) {
  fs.writeFileSync(cssInteropCacheFile, '');
}

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'tsx', 'ts'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const originalResolveRequest = context.resolveRequest;

  if (platform === 'web') {
    // Resolve RN Platform module to web equivalent
    if (moduleName.includes('../Utilities/Platform')) {
      return {
        type: 'sourceFile',
        filePath: require.resolve('react-native-web/dist/exports/Platform'),
      };
    }
    // Empty-resolve native-only modules on web
    if (moduleName === 'react-native-google-mobile-ads') {
      return { type: 'empty' };
    }
  }

  return originalResolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
