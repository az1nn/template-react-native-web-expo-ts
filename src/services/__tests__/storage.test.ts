import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../storage';

describe('storage service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setItem stores a value', async () => {
    await storage.setItem('testKey', { foo: 'bar' });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@app:testKey',
      JSON.stringify({ foo: 'bar' })
    );
  });

  it('getItem retrieves stored value', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ foo: 'bar' }));
    const result = await storage.getItem<{ foo: string }>('testKey');
    expect(result).toEqual({ foo: 'bar' });
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@app:testKey');
  });

  it('getItem returns null for missing keys', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const result = await storage.getItem('missingKey');
    expect(result).toBeNull();
  });

  it('removeItem deletes value', async () => {
    await storage.removeItem('testKey');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@app:testKey');
  });
});
