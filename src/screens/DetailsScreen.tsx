import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MenuScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

type MenuItem = {
  nameKey: string;
  descKey: string;
};

const MENU_SECTIONS: { titleKey: string; items: MenuItem[] }[] = [
  {
    titleKey: 'menu.cards',
    items: [
      { nameKey: 'menu.pokemonName', descKey: 'menu.pokemonDesc' },
      { nameKey: 'menu.magicName', descKey: 'menu.magicDesc' },
      { nameKey: 'menu.yugiohName', descKey: 'menu.yugiohDesc' },
    ],
  },
  {
    titleKey: 'menu.retroGames',
    items: [
      { nameKey: 'menu.n64Name', descKey: 'menu.n64Desc' },
      { nameKey: 'menu.atariName', descKey: 'menu.atariDesc' },
      { nameKey: 'menu.playstationName', descKey: 'menu.playstationDesc' },
    ],
  },
  {
    titleKey: 'menu.books',
    items: [
      { nameKey: 'menu.fictionName', descKey: 'menu.fictionDesc' },
      { nameKey: 'menu.comicsName', descKey: 'menu.comicsDesc' },
      { nameKey: 'menu.nonFictionName', descKey: 'menu.nonFictionDesc' },
    ],
  },
  {
    titleKey: 'menu.cdsVinyls',
    items: [
      { nameKey: 'menu.cdsName', descKey: 'menu.cdsDesc' },
      { nameKey: 'menu.vinylsName', descKey: 'menu.vinylsDesc' },
    ],
  },
  {
    titleKey: 'menu.beverages',
    items: [
      { nameKey: 'menu.hotBeveragesName', descKey: 'menu.hotBeveragesDesc' },
      { nameKey: 'menu.coldBeveragesName', descKey: 'menu.coldBeveragesDesc' },
    ],
  },
];

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-10 items-center">
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('menu.title')}
          </Text>
          <Text className="text-lg text-secondary-foreground/80 text-center mt-2 italic">
            {t('menu.subtitle')}
          </Text>
        </View>

        {/* Menu Sections */}
        <View className="px-6 py-8 items-center">
          <View className="w-full max-w-lg gap-8">
            {MENU_SECTIONS.map((section) => (
              <View key={section.titleKey} className="gap-4">
                <Text className="text-xl font-bold text-accent border-b border-accent/30 pb-2">
                  {t(section.titleKey)}
                </Text>
                {section.items.map((item) => (
                  <Card key={item.nameKey} className="w-full">
                    <CardHeader>
                      <CardTitle>{t(item.nameKey)}</CardTitle>
                      <CardDescription>{t(item.descKey)}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Back Button */}
        <View className="px-8 pb-10 items-center">
          <Button
            variant="outline"
            onPress={() => navigation.goBack()}
            className="w-full max-w-lg"
          >
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
