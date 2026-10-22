import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Announcement } from '@src/api/announcements';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { formatAnnouncementDate } from '../AnnouncementDetailScreen.utils';
import { themedStyles } from './AnnouncementMetadata.styles';

interface Props { announcement: Announcement; t: TFunction }

export function AnnouncementMetadata({ announcement, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <>
      <View style={styles.row}>
        {announcement.isPinned && (
          <View style={styles.pinned}>
            <MaterialCommunityIcons name="pin" size={12} color={colors.onAccent} />
            <Text style={styles.pinnedText}>{t('community.pinned')}</Text>
          </View>
        )}
        <Text style={styles.date}>{formatAnnouncementDate(announcement.date)}</Text>
        {!!announcement.eventDate && (
          <View style={styles.event}>
            <MaterialCommunityIcons name="calendar-star" size={12} color={colors.accent} />
            <Text style={styles.eventText}>
              {t('community.event_date', { date: formatAnnouncementDate(announcement.eventDate) })}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{announcement.title}</Text>
    </>
  );
}
