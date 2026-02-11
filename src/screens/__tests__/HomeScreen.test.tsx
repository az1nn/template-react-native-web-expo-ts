import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Welcome',
        'home.subtitle': 'React Native Template',
        'home.goToDetails': 'View Details',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays expected translated text', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('React Native Template')).toBeTruthy();
  });

  it('has a navigation button', () => {
    const { getByText } = render(<HomeScreen />);
    const button = getByText('View Details');
    expect(button).toBeTruthy();
  });
});
