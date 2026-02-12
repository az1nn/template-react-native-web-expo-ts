import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';
import { cn } from '@/lib/utils';

type MenuButtonProps = {
  className?: string;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ className }) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fafafa' : '#09090b';

  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      className={cn(
        'absolute top-8 left-4 z-10 h-10 w-10 items-center justify-center rounded-md bg-background/80 active:bg-accent',
        className,
      )}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      <Menu size={24} color={iconColor} />
    </Pressable>
  );
};
