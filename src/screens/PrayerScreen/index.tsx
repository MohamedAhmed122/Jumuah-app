import { RefreshControl, ScrollView, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { MosqueSource } from './components/MosqueSource';
import { NextPrayerCountdown } from './components/NextPrayerCountdown';
import { PrayerHeader } from './components/PrayerHeader';
import { PrayerList } from './components/PrayerList';
import { PrayerWarnings } from './components/PrayerWarnings';
import { QuickActions } from './components/QuickActions';
import { usePrayerScreen } from './hooks/PrayerScreen.hooks';
import { createRootInset, themedStyles } from './PrayerScreen.styles';

export default function PrayerScreen() {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const screen = usePrayerScreen();
  const { t, settings, prayerData, prayerLogs, warnings } = screen;
  return (
    <View style={[styles.root, createRootInset(screen.insets.top)]}>
      <PrayerHeader hijriDate={screen.hijriDate} gregorianDate={screen.gregorianDate} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={screen.refreshing} onRefresh={screen.refresh} tintColor={colors.accent} colors={[colors.accent]} />}
      >
        <MosqueSource mosque={prayerData.mosque} source={prayerData.source} t={t} />
        <PrayerWarnings
          times={prayerData.times}
          showHighLatitude={warnings.showHighLatitude}
          showShortAsr={warnings.showShortAsr}
          dismissHighLatitude={warnings.dismissHighLatitude}
          dismissShortAsr={warnings.dismissShortAsr}
          t={t}
        />
        <NextPrayerCountdown prayer={screen.nextPrayer} countdown={screen.countdown} t={t} />
        <PrayerList
          times={prayerData.times}
          iqamaTimes={prayerData.iqamaTimes}
          jummahTimes={screen.jummahTimes}
          activePrayer={screen.activePrayer}
          nextPrayer={screen.nextPrayer}
          logs={prayerLogs.logs}
          toggles={settings.notificationToggles}
          onToggle={settings.togglePrayerNotification}
          onLog={prayerLogs.logPrayer}
          showLogControls={settings.appVisibility.prayerLogActions}
        />
        <QuickActions t={t} visibility={settings.appVisibility} />
      </ScrollView>
    </View>
  );
}
