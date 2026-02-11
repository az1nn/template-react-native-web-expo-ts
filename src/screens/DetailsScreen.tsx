import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { DetailsScreenNavigationProp, DetailsScreenRouteProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { t } = useTranslation();
  const { id } = route.params;

  return (
    <View className="flex-1 bg-background justify-center items-center p-8">
      <MenuButton />
      <View className="items-center w-full max-w-md gap-6">
        <Text className="text-3xl font-bold text-foreground mb-6">
          {t('details.title')}
        </Text>

        <Card className="w-full mb-8 border-border bg-card">
          <CardHeader>
             <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
               {t('details.idLabel')}
             </CardTitle>
          </CardHeader>
          <CardContent className="items-center pb-6">
            <Text className="text-2xl font-semibold text-primary">
              {id}
            </Text>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onPress={() => navigation.goBack()}
          className="w-full"
        >
          <Text>{t('common.back')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default DetailsScreen;
