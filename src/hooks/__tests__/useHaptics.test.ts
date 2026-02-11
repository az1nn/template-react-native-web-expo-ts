import { renderHook } from '@testing-library/react-native';
import { useHaptics } from '../useHaptics';

// Platform is already mocked by react-native in jest setup
jest.mock('react-native', () => ({
  Platform: { OS: 'web' },
}));

describe('useHaptics', () => {
  it('returns expected methods', () => {
    const { result } = renderHook(() => useHaptics());
    expect(typeof result.current.triggerImpact).toBe('function');
    expect(typeof result.current.triggerNotification).toBe('function');
    expect(typeof result.current.triggerSelection).toBe('function');
  });

  it('triggerImpact is callable without errors', async () => {
    const { result } = renderHook(() => useHaptics());
    await expect(result.current.triggerImpact('light')).resolves.toBeUndefined();
  });

  it('triggerNotification is callable without errors', async () => {
    const { result } = renderHook(() => useHaptics());
    await expect(result.current.triggerNotification('success')).resolves.toBeUndefined();
  });

  it('triggerSelection is callable without errors', async () => {
    const { result } = renderHook(() => useHaptics());
    await expect(result.current.triggerSelection()).resolves.toBeUndefined();
  });
});
