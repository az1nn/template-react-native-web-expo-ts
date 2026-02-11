import { useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type ImpactStyle = 'light' | 'medium' | 'heavy';
type NotificationType = 'success' | 'warning' | 'error';

interface UseHapticsReturn {
  triggerImpact: (style?: ImpactStyle) => void;
  triggerNotification: (type?: NotificationType) => void;
  triggerSelection: () => void;
}

const impactStyleMap: Record<ImpactStyle, Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const notificationTypeMap: Record<NotificationType, Haptics.NotificationFeedbackType> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

export const useHaptics = (): UseHapticsReturn => {
  const triggerImpact = useCallback(async (style: ImpactStyle = 'medium') => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.impactAsync(impactStyleMap[style]);
    } catch {
      // no-op on error
    }
  }, []);

  const triggerNotification = useCallback(async (type: NotificationType = 'success') => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.notificationAsync(notificationTypeMap[type]);
    } catch {
      // no-op on error
    }
  }, []);

  const triggerSelection = useCallback(async () => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.selectionAsync();
    } catch {
      // no-op on error
    }
  }, []);

  return { triggerImpact, triggerNotification, triggerSelection };
};
