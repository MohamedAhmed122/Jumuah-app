import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { useSlideTransition } from '../hooks/useSlideTransition';
import type { TvAnnouncementsView, TvHeaderView, TvNextView } from '../TvPrayerScreen.types';
import { TvAnnouncementCard } from './TvAnnouncementCard';
import { themedStyles } from './TvAnnouncementsScreen.styles';
import { TvNextPrayerBox } from './TvNextPrayerBox';
import { TvProgressFooter } from './TvProgressFooter';

interface Props {
  announcements: TvAnnouncementsView;
  header: TvHeaderView;
  next: TvNextView;
  t: TFunction;
}

export function TvAnnouncementsScreen({ announcements, header, next, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { slides, index } = announcements;
  const { previousIndex, incomingStyle, outgoingStyle } = useSlideTransition(index);
  const previous = previousIndex !== null ? slides[previousIndex] : undefined;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="bullhorn-outline" size={46} color={colors.accent} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{t('tv.announcements')}</Text>
            <Text style={styles.mosque} numberOfLines={1}>{header.mosqueLine}</Text>
          </View>
        </View>
        <TvNextPrayerBox next={next} t={t} />
      </View>
      <View style={styles.stage}>
        {previous ? <TvAnnouncementCard key={`out-${previous.key}`} slide={previous} animatedStyle={outgoingStyle} /> : null}
        {slides[index] ? <TvAnnouncementCard key={`in-${slides[index].key}`} slide={slides[index]} animatedStyle={incomingStyle} /> : null}
      </View>
      <TvProgressFooter
        keys={slides.map((slide) => slide.key)} index={index}
        progressPercent={announcements.progressPercent} counter={announcements.counter}
      />
    </View>
  );
}
