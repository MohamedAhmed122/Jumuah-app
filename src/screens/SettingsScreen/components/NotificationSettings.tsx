import { Switch, Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { PRAYER_NAMES, type PrayerName } from '@constants/prayerMethods';
import type { NotificationToggles } from '@src/stores/settingsStore';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { createTrackColors } from '../SettingsScreen.constants';
import { SettingsSection } from './SettingsSection';
import { themedStyles } from './NotificationSettings.styles';

interface Props {
  toggles: NotificationToggles;
  kahfEnabled: boolean;
  onToggle: (prayer: PrayerName, type: 'adhan' | 'reminder') => void;
  onKahfChange: (enabled: boolean) => void;
  t: TFunction;
}

export function NotificationSettings(props: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const trackColors = createTrackColors(colors);
  const { toggles, kahfEnabled, onToggle, onKahfChange, t } = props;
  return (
    <SettingsSection label={t('settings.notifications')}>
      <View style={styles.header}>
        <Text style={styles.headerLeft} />
        <Text style={styles.headerRight}>{t('prayer.toggle_adhan')}</Text>
        <Text style={styles.headerRight}>{t('prayer.toggle_reminder')}</Text>
      </View>
      {PRAYER_NAMES.map((prayer) => (
        <View key={prayer} style={styles.row}>
          <Text style={styles.label}>{t(`prayer.${prayer}`)}</Text>
          <Switch value={toggles[prayer]?.adhan ?? true} onValueChange={() => onToggle(prayer, 'adhan')} trackColor={trackColors.adhan} thumbColor={colors.switchThumb} />
          <Switch value={toggles[prayer]?.reminder ?? true} onValueChange={() => onToggle(prayer, 'reminder')} trackColor={trackColors.reminder} thumbColor={colors.switchThumb} />
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.label}>{t('settings.kahf_reminder')}</Text>
        <Switch value={kahfEnabled} onValueChange={onKahfChange} trackColor={trackColors.adhan} thumbColor={colors.switchThumb} />
      </View>
    </SettingsSection>
  );
}
