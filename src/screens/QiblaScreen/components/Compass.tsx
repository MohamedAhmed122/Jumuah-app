import { View } from 'react-native';

import type { CompassRotationStyle } from '../QiblaScreen.types';
import { CompassRose } from './CompassRose';
import { QiblaNeedle } from './QiblaNeedle';
import { styles } from './Compass.styles';

interface CompassProps {
  compassStyle: CompassRotationStyle;
  needleStyle: CompassRotationStyle;
}

export function Compass({ compassStyle, needleStyle }: CompassProps) {
  return (
    <View style={styles.wrapper}>
      <CompassRose animatedStyle={compassStyle} />
      <QiblaNeedle animatedStyle={needleStyle} />
      <View style={styles.centerDot} />
    </View>
  );
}
