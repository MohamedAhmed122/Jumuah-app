import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './BearingInfo.styles';

interface BearingInfoProps {
  direction: string;
  displayBearing: number;
  displayQiblaBearing: number;
  label: string;
}

export function BearingInfo({ direction, displayBearing, displayQiblaBearing, label }: BearingInfoProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.bearing}>{displayBearing}°</Text>
      <Text style={styles.label}>{label}: {displayQiblaBearing}° {direction}</Text>
    </View>
  );
}
