import { Switch, Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { AppVisibility } from '@src/stores/settingsStore';
import { ADHAN_TRACK_COLORS } from '../SettingsScreen.constants';
import { SettingsSection } from './SettingsSection';
import { styles } from './CustomizeAppSettings.styles';

interface Props {
  values: AppVisibility;
  onChange: (key: keyof AppVisibility, visible: boolean) => void;
  t: TFunction;
}

const PRAYER_OPTIONS = ['prayerLogActions', 'prayerTracker', 'prayerQada', 'prayerHistory'] as const;
const COMMUNITY_OPTIONS = ['announcements', 'events', 'agenda', 'community'] as const;

export function CustomizeAppSettings({ values, onChange, t }: Props) {
  return (
    <>
      <OptionSection label={t('settings.prayer_screen')} options={PRAYER_OPTIONS} values={values} onChange={onChange} t={t} />
      <OptionSection label={t('settings.halal_places')} options={['halalPlaces']} values={values} onChange={onChange} t={t} />
      <OptionSection label={t('settings.community_screen')} options={COMMUNITY_OPTIONS} values={values} onChange={onChange} t={t} />
    </>
  );
}

function OptionSection({ label, options, values, onChange, t }: Props & { label: string; options: readonly (keyof AppVisibility)[] }) {
  return (
    <SettingsSection label={label}>
      {options.map((key, index) => (
        <View key={key} style={[styles.row, index === options.length - 1 && styles.lastRow]}>
          <Text style={styles.label}>{t(`settings.visibility_${key}`)}</Text>
          <View style={styles.toggleFrame}>
            <Switch style={styles.toggle} value={values[key]} onValueChange={(visible) => onChange(key, visible)} trackColor={ADHAN_TRACK_COLORS} thumbColor={Colors.textPrimary} />
          </View>
        </View>
      ))}
    </SettingsSection>
  );
}
