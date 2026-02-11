import React from 'react';
import { View, Switch, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Moon, Sun, Languages } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português' },
];

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const navigateToHome = () => {
    props.navigation.navigate('Main', { screen: 'Home' });
    props.navigation.closeDrawer();
  };

  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  const currentLanguageLabel =
    LANGUAGES.find((l) => l.code === language)?.label ?? language;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingBottom: insets.bottom }}
    >
      <View className="flex-1 bg-background px-4">
        {/* Header */}
        <View className="border-b border-border pb-4 mb-2 mt-2">
          <Text className="text-xl font-bold text-foreground">
            {t('sidemenu.appName')}
          </Text>
        </View>

        {/* Navigation */}
        <View className="gap-1 mt-2">
          <Pressable
            onPress={navigateToHome}
            className="flex-row items-center gap-3 rounded-md px-3 py-3 active:bg-accent"
          >
            <Home size={20} color={isDark ? '#fafafa' : '#09090b'} />
            <Text className="text-base text-foreground">{t('sidemenu.home')}</Text>
          </Pressable>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Settings section */}
        <View className="border-t border-border pt-4 gap-3 mb-4">
          {/* Theme toggle */}
          <View className="flex-row items-center justify-between px-3 py-2">
            <View className="flex-row items-center gap-3">
              {isDark ? (
                <Moon size={20} color={isDark ? '#fafafa' : '#09090b'} />
              ) : (
                <Sun size={20} color={isDark ? '#fafafa' : '#09090b'} />
              )}
              <Text className="text-base text-foreground">
                {isDark ? t('sidemenu.darkMode') : t('sidemenu.lightMode')}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#6366f1' }}
              thumbColor={isDark ? '#e0e7ff' : '#f4f3f4'}
            />
          </View>

          {/* Language toggle */}
          <Pressable
            onPress={cycleLanguage}
            className="flex-row items-center justify-between px-3 py-2 rounded-md active:bg-accent"
          >
            <View className="flex-row items-center gap-3">
              <Languages size={20} color={isDark ? '#fafafa' : '#09090b'} />
              <Text className="text-base text-foreground">{t('sidemenu.language')}</Text>
            </View>
            <Text className="text-sm text-muted-foreground">{currentLanguageLabel}</Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
