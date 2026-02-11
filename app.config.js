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
      name: 'Template App',
      slug: 'template-react-native-web-expo-ts',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.yourorg.templateapp',
        googleServicesFile: './GoogleService-Info.plist',
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#ffffff',
        },
        package: 'com.yourorg.templateapp',
        googleServicesFile: './google-services.json',
      },
      web: { favicon: './assets/favicon.png' },
      plugins,
    },
  };
};
