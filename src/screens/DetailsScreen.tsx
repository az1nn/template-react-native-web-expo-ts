import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { DetailsScreenNavigationProp, DetailsScreenRouteProp } from '../types/navigation';

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { t } = useTranslation();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('details.title')}</Text>
        <View style={styles.card}>
          <Text style={styles.label}>{t('details.idLabel')}</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    minWidth: 240,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  label: {
    fontSize: 14,
    color: '#a0a0c0',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c63ff',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6c63ff',
  },
  buttonText: {
    color: '#6c63ff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailsScreen;
