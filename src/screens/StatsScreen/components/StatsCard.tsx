import { Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './StatsCard.styles';

interface Props { title: string; children: ReactNode }

export function StatsCard({ title, children }: Props) {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}
