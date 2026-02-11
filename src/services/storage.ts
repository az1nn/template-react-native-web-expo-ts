import AsyncStorage from '@react-native-async-storage/async-storage';

const NAMESPACE = '@app';

const namespacedKey = (key: string): string => `${NAMESPACE}:${key}`;

export const storage = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(namespacedKey(key));
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(namespacedKey(key), JSON.stringify(value));
    } catch {
      // handle silently
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(namespacedKey(key));
    } catch {
      // handle silently
    }
  },
};

export default storage;
