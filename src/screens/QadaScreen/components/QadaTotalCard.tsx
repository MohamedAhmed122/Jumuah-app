import { Text, View } from 'react-native';

import { styles } from './QadaTotalCard.styles';

interface QadaTotalCardProps {
  label: string;
  total: number;
}

export function QadaTotalCard({ label, total }: QadaTotalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.total}>{total}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
