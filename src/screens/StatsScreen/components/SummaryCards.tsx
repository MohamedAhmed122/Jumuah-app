import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { createProgressStyle, styles } from './SummaryCards.styles';

interface Props { monthlyPct: number; streak: number; t: TFunction }

export function SummaryCards({ monthlyPct, streak, t }: Props) {
  const month = new Date().toLocaleDateString(undefined, { month: 'short' });
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <View style={styles.ring}>
          <View style={[styles.ringFill, createProgressStyle(monthlyPct)]} />
          <Text style={styles.percentage}>{monthlyPct}%</Text>
        </View>
        <Text style={styles.label}>{month}</Text>
      </View>
      <View style={styles.streakCard}>
        <Text style={styles.streak}>{streak}</Text>
        <MaterialCommunityIcons name="fire" size={28} color={Colors.accent} />
        <Text style={styles.label}>{t('tracker.streak_label')}</Text>
      </View>
    </View>
  );
}
