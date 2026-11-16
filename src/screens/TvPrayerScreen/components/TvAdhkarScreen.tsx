import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { useSlideTransition } from '../hooks/useSlideTransition';
import { ADHKAR_ITEMS } from '../TvPrayerScreen.adhkar';
import type { TvAdhkarView } from '../TvPrayerScreen.adhkar.types';
import type { TvNextView } from '../TvPrayerScreen.types';
import { TvAdhkarCard } from './TvAdhkarCard';
import { themedStyles } from './TvAdhkarScreen.styles';
import { TvNextPrayerBox } from './TvNextPrayerBox';
import { TvProgressFooter } from './TvProgressFooter';

interface Props {
  view: TvAdhkarView;
  next: TvNextView;
  t: TFunction;
}

export function TvAdhkarScreen({ view, next, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { previousIndex, incomingStyle, outgoingStyle } = useSlideTransition(view.index);
  const previous = previousIndex !== null ? ADHKAR_ITEMS[previousIndex] : undefined;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={44} color={colors.accent} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{t('tv.adhkar_after_prayer')}</Text>
            <Text style={styles.subtitle}>{`${view.prayerName} · ${view.roundLabel}`}</Text>
          </View>
        </View>
        <TvNextPrayerBox next={next} t={t} />
      </View>
      <View style={styles.stage}>
        {previous ? <TvAdhkarCard key={`out-${previous.key}`} item={previous} animatedStyle={outgoingStyle} t={t} /> : null}
        <TvAdhkarCard key={`in-${view.item.key}`} item={view.item} animatedStyle={incomingStyle} t={t} />
      </View>
      <TvProgressFooter
        keys={ADHKAR_ITEMS.map((item) => item.key)} index={view.index}
        progressPercent={view.progressPercent} counter={view.counter}
      />
    </View>
  );
}
