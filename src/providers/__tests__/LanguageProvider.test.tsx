import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { LanguageProvider, useLanguage } from '../LanguageProvider';

// Mock i18n and its dependencies
jest.mock('../../i18n', () => ({
  changeLanguage: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('i18next', () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
  changeLanguage: jest.fn(() => Promise.resolve()),
}));

const TestConsumer: React.FC = () => {
  const { language } = useLanguage();
  return <Text testID="language-value">{language}</Text>;
};

describe('LanguageProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Text>Child Content</Text>
      </LanguageProvider>
    );
    expect(getByText('Child Content')).toBeTruthy();
  });

  it('useLanguage hook returns expected defaults', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(getByTestId('language-value')).toBeTruthy();
  });

  it('throws when useLanguage is used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useLanguage must be used within LanguageProvider'
    );
    spy.mockRestore();
  });
});
