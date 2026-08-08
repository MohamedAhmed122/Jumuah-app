import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { WeeklyDay } from '../StatsScreen.types';
import { StatsCard } from './StatsCard';
import { createBarHeight, styles } from './WeeklyChart.styles';

interface Props { days: WeeklyDay[]; t: TFunction }

export function WeeklyChart({ days, t }: Props) {
  return (
    <StatsCard title={t('tracker.last_7_days')}>
      <View style={styles.chart}>
        {days.map((day, index) => {
          const isToday = index === 6;
          return (
            <View key={index} style={styles.column}>
              <View style={styles.track}>
                <View style={[styles.fill, createBarHeight(day.prayed), isToday && styles.todayFill]} />
              </View>
              <Text style={[styles.label, isToday && styles.todayLabel]}>{day.label}</Text>
              <Text style={styles.count}>{day.prayed}</Text>
            </View>
          );
        })}
      </View>
    </StatsCard>
  );
}
