import { Text, View } from 'react-native';

import { styles } from './BearingInfo.styles';

interface BearingInfoProps {
  direction: string;
  displayBearing: number;
  displayQiblaBearing: number;
  label: string;
}

export function BearingInfo({ direction, displayBearing, displayQiblaBearing, label }: BearingInfoProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.bearing}>{displayBearing}° {direction}</Text>
      <Text style={styles.label}>{label}: {displayQiblaBearing}°</Text>
    </View>
  );
}
