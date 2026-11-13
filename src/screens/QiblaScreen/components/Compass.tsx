import { View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import type { CompassRotationStyle } from '../QiblaScreen.types';
import { CompassRose } from './CompassRose';
import { QiblaNeedle } from './QiblaNeedle';
import { themedStyles } from './Compass.styles';

interface CompassProps {
  compassStyle: CompassRotationStyle;
  needleStyle: CompassRotationStyle;
}

export function Compass({ compassStyle, needleStyle }: CompassProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.wrapper}>
      <CompassRose animatedStyle={compassStyle} />
      <QiblaNeedle animatedStyle={needleStyle} />
      <View style={styles.centerDot} />
    </View>
  );
}
