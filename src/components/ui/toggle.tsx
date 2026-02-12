/* eslint-disable react-hooks/refs */
// Disabling react-hooks/refs because React Native Animated.Value requires accessing
// refs during render for interpolations, which is a valid pattern for animations
import React, { useEffect, useRef, useMemo } from 'react';
import { Pressable, Animated, ViewStyle } from 'react-native';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  activeColor = '#3b82f6', // blue-500
  inactiveColor = '#d1d5db', // gray-300
  thumbColor = '#ffffff',
  disabled = false,
  style,
}) => {
  const animatedValueRef = useRef(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.spring(animatedValueRef.current, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 100,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const backgroundColor = useMemo(
    () =>
      animatedValueRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveColor, activeColor],
      }),
    [inactiveColor, activeColor]
  );

  const thumbPosition = useMemo(
    () =>
      animatedValueRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 30], // Moves from left (2px padding) to right (50px width - 18px thumb - 2px padding = 30px)
      }),
    []
  );

  return (
    <Pressable
      onPress={toggleSwitch}
      disabled={disabled}
      style={[
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <Animated.View
        style={{
          width: 50,
          height: 28,
          borderRadius: 14,
          backgroundColor,
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: thumbColor,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transform: [{ translateX: thumbPosition }],
          }}
        />
      </Animated.View>
    </Pressable>
  );
};
