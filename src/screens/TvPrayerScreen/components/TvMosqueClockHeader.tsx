import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import type { TvHeaderView } from '../TvPrayerScreen.types';
import { themedStyles } from './TvMosqueClockHeader.styles';

interface Props {
  header: TvHeaderView;
}

export function TvMosqueClockHeader({ header }: Props) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.header}>
      <Text style={styles.mosque} numberOfLines={1}>{header.mosqueLine}</Text>
      <View style={styles.clockRow}>
        <Text style={styles.clock}>{header.clock}</Text>
        <Text style={styles.clockSeconds}>{header.seconds}</Text>
      </View>
    </View>
  );
}
