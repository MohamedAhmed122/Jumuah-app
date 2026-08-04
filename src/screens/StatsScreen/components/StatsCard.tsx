import { Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { styles } from './StatsCard.styles';

interface Props { title: string; children: ReactNode }

export function StatsCard({ title, children }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}
