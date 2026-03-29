module.exports = () => {
  const isWebBuild = process.env.EXPO_PUBLIC_BUILD_PLATFORM === 'web';

  const plugins = isWebBuild
    ? []
    : [
        '@react-native-google-signin/google-signin',
        // For production, also add:
        // ["react-native-google-mobile-ads", {
        //   androidAppId: "ca-app-pub-xxx",
        //   iosAppId: "ca-app-pub-xxx"
        // }]
      ];

  return {
    expo: {
      name: 'Bazar Retrô',
      slug: 'bazar-retro',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#fffbe8',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.bazarretro.app',
        googleServicesFile: './GoogleService-Info.plist',
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#fffbe8',
        },
        package: 'com.bazarretro.app',
        googleServicesFile: './google-services.json',
      },
      web: { favicon: './assets/favicon.png' },
      plugins,
    },
  };
};
