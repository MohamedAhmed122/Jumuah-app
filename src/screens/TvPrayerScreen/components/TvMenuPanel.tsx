import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { TvMenuOptions } from '../hooks/useTvMenuOptions';
import { TvDurationStepper } from './TvDurationStepper';
import { TvFocusable } from './TvFocusable';
import { themedStyles } from './TvMenuPanel.styles';
import { TvMenuSection } from './TvMenuSection';
import { TvOption } from './TvOption';

interface Props {
  options: TvMenuOptions;
  onClose: () => void;
}

export function TvMenuPanel({ options, onClose }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { t } = options;

  return (
    <>
      <View style={styles.backdrop} />
      <View style={styles.panel} accessibilityLabel={t('tv.settings')}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('tv.settings')}</Text>
          <TvFocusable shape="round" onPress={onClose} accessibilityLabel={t('tv.close')}>
            <View style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={34} color={colors.textPrimary} />
            </View>
          </TvFocusable>
        </View>
        <TvMenuSection icon="web" title={`1 · ${t('tv.language')}`}>
          <View style={styles.row}>
            {options.languages.map((option) => (
              <TvOption
                key={option.id} label={option.label} selected={option.selected}
                onPress={option.onPress} preferredFocus={option.selected}
              />
            ))}
          </View>
        </TvMenuSection>
        <TvMenuSection icon="mosque" title={`2 · ${t('tv.mosque')}`}>
          <ScrollView style={styles.mosqueList} contentContainerStyle={styles.mosqueListContent}>
            {options.mosques.map((option) => (
              <TvOption
                key={option.id} label={option.label} sub={option.sub} selected={option.selected}
                onPress={option.onPress} variant="list"
              />
            ))}
          </ScrollView>
        </TvMenuSection>
        <View style={styles.pairRow}>
          <TvMenuSection icon="white-balance-sunny" title={`3 · ${t('tv.theme')}`} half>
            <View style={styles.row}>
              {options.themes.map((option) => (
                <TvOption key={option.id} label={option.label} selected={option.selected} onPress={option.onPress} />
              ))}
            </View>
          </TvMenuSection>
          <TvMenuSection icon="bullhorn-outline" title={`4 · ${t('tv.announcements')}`} half>
            <View style={styles.row}>
              {options.announcements.map((option) => (
                <TvOption key={option.id} label={option.label} selected={option.selected} onPress={option.onPress} />
              ))}
            </View>
          </TvMenuSection>
        </View>
        <TvMenuSection icon="timer-outline" title={`5 · ${t('tv.announcement_time')}`} disabled={!options.duration.enabled}>
          <TvDurationStepper {...options.duration} />
        </TvMenuSection>
        <Text style={styles.hint}>{t('tv.remote_hint')}</Text>
      </View>
    </>
  );
}
