import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { CompassRotationStyle } from '../QiblaScreen.types';
import { themedStyles } from './QiblaNeedle.styles';

interface QiblaNeedleProps {
  animatedStyle: CompassRotationStyle;
}

export function QiblaNeedle({ animatedStyle }: QiblaNeedleProps) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.tip} />
      <View style={styles.body} />
      <MaterialCommunityIcons
        name="star-crescent"
        size={24}
        color={colors.accent}
        style={styles.icon}
      />
    </Animated.View>
  );
}
