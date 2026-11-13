import { Text, View } from 'react-native';

import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './QadaTotalCard.styles';

interface QadaTotalCardProps {
  label: string;
  total: number;
}

export function QadaTotalCard({ label, total }: QadaTotalCardProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.total}>{total}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
