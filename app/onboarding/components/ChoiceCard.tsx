import type { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './ChoiceCard.styles';

interface Props { active: boolean; children: ReactNode; label: string; onPress: () => void }

export function ChoiceCard({ active, children, label, onPress }: Props) {
  const styles = useThemedStyles(themedStyles);
  return (
    <TouchableOpacity style={[styles.card, active && styles.cardActive]} onPress={onPress} activeOpacity={0.8}>
      {children}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}
