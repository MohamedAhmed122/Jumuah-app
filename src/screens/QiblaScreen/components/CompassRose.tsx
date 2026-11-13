import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useThemedStyles } from '@src/hooks/useTheme';
import { CARDINALS, COMPASS_TICKS } from '../QiblaScreen.constants';
import type { CompassRotationStyle } from '../QiblaScreen.types';
import { cardinalRotationStyles, themedStyles, tickRotationStyles } from './CompassRose.styles';

interface CompassRoseProps {
  animatedStyle: CompassRotationStyle;
}

export function CompassRose({ animatedStyle }: CompassRoseProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <Animated.View style={[styles.rose, animatedStyle]}>
      {CARDINALS.map((label, index) => (
        <View key={label} style={[styles.cardinalContainer, cardinalRotationStyles[index]]}>
          <Text style={[styles.cardinal, label === 'N' && styles.cardinalNorth]}>{label}</Text>
        </View>
      ))}
      {COMPASS_TICKS.map((index) => (
        <View
          key={index}
          style={[
            styles.tick,
            tickRotationStyles[index],
            index % 18 === 0 ? styles.tickMajor : index % 6 === 0 ? styles.tickMid : styles.tickMinor,
          ]}
        />
      ))}
    </Animated.View>
  );
}
