import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { Colors } from '@constants/Colors';

import type { CompassRotationStyle } from '../QiblaScreen.types';
import { styles } from './QiblaNeedle.styles';

interface QiblaNeedleProps {
  animatedStyle: CompassRotationStyle;
}

export function QiblaNeedle({ animatedStyle }: QiblaNeedleProps) {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.tip} />
      <View style={styles.body} />
      <MaterialCommunityIcons
        name="star-crescent"
        size={24}
        color={Colors.accent}
        style={styles.icon}
      />
    </Animated.View>
  );
}
