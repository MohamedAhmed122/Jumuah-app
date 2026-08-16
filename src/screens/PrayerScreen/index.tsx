import { RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { MosqueSource } from './components/MosqueSource';
import { NextPrayerCountdown } from './components/NextPrayerCountdown';
import { PrayerHeader } from './components/PrayerHeader';
import { PrayerList } from './components/PrayerList';
import { PrayerWarnings } from './components/PrayerWarnings';
import { QuickActions } from './components/QuickActions';
import { usePrayerScreen } from './hooks/PrayerScreen.hooks';
import { createRootInset, styles } from './PrayerScreen.styles';

export default function PrayerScreen() {
  const screen = usePrayerScreen();
  const { t, settings, prayerData, prayerLogs, warnings } = screen;
  return (
    <View style={[styles.root, createRootInset(screen.insets.top)]}>
      <StatusBar barStyle="light-content" />
      <PrayerHeader hijriDate={screen.hijriDate} gregorianDate={screen.gregorianDate} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={screen.refreshing} onRefresh={screen.refresh} tintColor={Colors.accent} colors={[Colors.accent]} />}
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
