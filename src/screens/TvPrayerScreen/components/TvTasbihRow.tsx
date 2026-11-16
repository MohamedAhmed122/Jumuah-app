import { Text, View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { TASBIH_ITEMS } from '../TvPrayerScreen.adhkar';
import { themedStyles } from './TvTasbihRow.styles';

export function TvTasbihRow() {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {TASBIH_ITEMS.map((item) => (
          <View key={item.key} style={styles.card}>
            <Text style={styles.arabic}>{item.arabic}</Text>
            <Text style={styles.transliteration}>{item.transliteration}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </View>
        ))}
      </View>
      <View style={styles.divider} />
    </View>
  );
}
