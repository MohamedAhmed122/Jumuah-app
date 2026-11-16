import { View } from 'react-native';
import { useThemedStyles } from '@src/hooks/useTheme';
import { TvAdhanAlert } from './components/TvAdhanAlert';
import { TvAdhkarBreak } from './components/TvAdhkarBreak';
import { TvAdhkarScreen } from './components/TvAdhkarScreen';
import { TvAnnouncementsScreen } from './components/TvAnnouncementsScreen';
import { TvIqamaAlert } from './components/TvIqamaAlert';
import { TvIqamaCountdown } from './components/TvIqamaCountdown';
import { TvMainScreen } from './components/TvMainScreen';
import { TvMenuPanel } from './components/TvMenuPanel';
import { TvPrayingScreen } from './components/TvPrayingScreen';
import { useTvPrayerScreen } from './hooks/TvPrayerScreen.hooks';
import { themedStyles } from './TvPrayerScreen.styles';

export default function TvPrayerScreen() {
  const styles = useThemedStyles(themedStyles);
  const screen = useTvPrayerScreen();
  const { t, mode, alert, header, next, praying, adhkar, adhkarBreak } = screen;

  return (
    <View style={styles.screen} onLayout={screen.stageStyles.onLayout}>
      <View style={screen.stageStyles.stage}>
        {mode === 'prayers' ? (
          <TvMainScreen
            header={header} next={next} cards={screen.cards} t={t}
            menuOpen={screen.menu.menuOpen} onOpenMenu={screen.menu.openMenu}
          />
        ) : null}
        {mode === 'announcements' ? (
          <TvAnnouncementsScreen announcements={screen.announcements} header={header} next={next} t={t} />
        ) : null}
        {mode === 'adhan' && alert ? <TvAdhanAlert key={`adhan-${alert.adhanTime}`} alert={alert} t={t} /> : null}
        {mode === 'countdown' && alert ? <TvIqamaCountdown alert={alert} header={header} t={t} /> : null}
        {mode === 'iqama' && alert ? <TvIqamaAlert key={`iqama-${alert.iqamaTime}`} alert={alert} t={t} /> : null}
        {praying ? <TvPrayingScreen praying={praying} header={header} t={t} /> : null}
        {adhkar ? <TvAdhkarScreen view={adhkar} next={next} t={t} /> : null}
        {adhkarBreak ? <TvAdhkarBreak key={adhkarBreak.roundLabel} view={adhkarBreak} t={t} /> : null}
        {screen.menu.menuOpen && mode === 'prayers' ? (
          <TvMenuPanel options={screen.menuOptions} onClose={screen.menu.closeMenu} />
        ) : null}
      </View>
    </View>
  );
}
