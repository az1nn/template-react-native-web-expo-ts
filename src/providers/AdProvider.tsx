import React, { createContext, useContext, useState, useCallback } from 'react';
import { Platform } from 'react-native';

interface AdContextValue {
  adsEnabled: boolean;
  isLoaded: boolean;
  showBanner: () => void;
  showRewarded: () => Promise<void>;
  showInterstitial: () => Promise<void>;
}

const AdContext = createContext<AdContextValue | undefined>(undefined);

// Test ad unit IDs for development
const TEST_AD_UNITS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isNative = Platform.OS !== 'web';
  const [adsEnabled] = useState(isNative);
  const [isLoaded] = useState(false);

  const showBanner = useCallback(() => {
    if (!isNative) return;
    // Stub: real implementation uses react-native-google-mobile-ads BannerAd
    console.log('[AdProvider] showBanner - ad unit:', TEST_AD_UNITS.banner);
  }, [isNative]);

  const showRewarded = useCallback(async () => {
    if (!isNative) return;
    // Stub: real implementation uses RewardedAd
    console.log('[AdProvider] showRewarded - ad unit:', TEST_AD_UNITS.rewarded);
  }, [isNative]);

  const showInterstitial = useCallback(async () => {
    if (!isNative) return;
    // Stub: real implementation uses InterstitialAd
    console.log('[AdProvider] showInterstitial - ad unit:', TEST_AD_UNITS.interstitial);
  }, [isNative]);

  return (
    <AdContext.Provider
      value={{ adsEnabled, isLoaded, showBanner, showRewarded, showInterstitial }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAds = (): AdContextValue => {
  const ctx = useContext(AdContext);
  if (!ctx) throw new Error('useAds must be used within AdProvider');
  return ctx;
};
