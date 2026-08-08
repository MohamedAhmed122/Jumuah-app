import { ScrollView, View } from 'react-native';
import { MonthlyHeatmap } from './components/MonthlyHeatmap';
import { StatsHeader } from './components/StatsHeader';
import { SummaryCards } from './components/SummaryCards';
import { WeeklyChart } from './components/WeeklyChart';
import { useStatsScreen } from './hooks/StatsScreen.hooks';
import { createTopInset, styles } from './StatsScreen.styles';

export default function StatsScreen() {
  const { t, insets, statistics, goBack } = useStatsScreen();
  return (
    <View style={[styles.root, createTopInset(insets.top)]}>
      <StatsHeader onBack={goBack} t={t} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!!statistics.stats && (
          <>
            <SummaryCards
              monthlyPct={statistics.stats.monthlyPct}
              streak={statistics.stats.streak}
              t={t}
            />
            <WeeklyChart days={statistics.stats.weekly} t={t} />
            <MonthlyHeatmap
              days={statistics.stats.heatmap}
              firstWeekday={statistics.stats.firstWeekday}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
