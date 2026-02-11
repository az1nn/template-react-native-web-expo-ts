import { Platform, NativeModules } from 'react-native';

export const getDeviceLanguage = (): string => {
  if (Platform.OS === 'ios') {
    return (
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
      'en'
    );
  } else if (Platform.OS === 'android') {
    return NativeModules.I18nManager?.localeIdentifier || 'en';
  }
  // Web
  if (typeof navigator !== 'undefined') {
    return navigator.language || 'en';
  }
  return 'en';
};

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
