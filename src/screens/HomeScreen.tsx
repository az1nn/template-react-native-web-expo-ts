import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background justify-center items-center p-8">
      <View className="items-center w-full max-w-md gap-6">
        <Text className="text-4xl font-bold text-foreground text-center">
          {t('home.title')}
        </Text>
        <Text className="text-xl text-muted-foreground text-center mb-4">
          {t('home.subtitle')}
        </Text>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            <Button
              onPress={() => navigation.navigate('Details', { id: 'sample-123' })}
              className="w-full"
            >
              <Text>{t('home.goToDetails')}</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

export default HomeScreen;
