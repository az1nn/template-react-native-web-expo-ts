import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Bazar Retrô',
        'home.subtitle': 'Your Nostalgic Treasure Trove',
        'home.heroTagline': 'Trading cards, retro games, used books, vinyl records, and craft beverages — all under one roof.',
        'home.aboutTitle': 'Our Story',
        'home.aboutText': 'Born from a passion for nostalgia and pop culture.',
        'home.featuredTitle': 'Featured Categories',
        'home.featuredCards': 'Trading Cards',
        'home.featuredCardsDesc': 'Pokémon TCG, Magic: The Gathering, and Yu-Gi-Oh! — boosters, singles, and sealed products.',
        'home.featuredRetro': 'Retro Games',
        'home.featuredRetroDesc': 'Classic titles for Nintendo 64, Atari, and PlayStation.',
        'home.featuredBeverages': 'Craft Beverages',
        'home.featuredBeveragesDesc': 'Artisanal coffee, specialty teas, fresh juices, and craft sodas.',
        'home.viewFullMenu': 'Browse Catalog',
        'home.learnMore': 'Our Story',
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
    expect(getByText('Bazar Retrô')).toBeTruthy();
    expect(getByText('Your Nostalgic Treasure Trove')).toBeTruthy();
  });

  it('has navigation buttons', () => {
    const { getAllByText } = render(<HomeScreen />);
    const menuButtons = getAllByText('Browse Catalog');
    expect(menuButtons.length).toBeGreaterThan(0);
  });

  it('displays featured categories', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Featured Categories')).toBeTruthy();
    expect(getByText('Trading Cards')).toBeTruthy();
    expect(getByText('Retro Games')).toBeTruthy();
    expect(getByText('Craft Beverages')).toBeTruthy();
  });
});
