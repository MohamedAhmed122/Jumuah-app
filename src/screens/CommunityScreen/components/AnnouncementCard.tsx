import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@constants/Colors';
import { announcementPlainText } from '@src/api/announcements';
import { resolveMediaUrl } from '@src/api/media';
import type { AnnouncementCardProps } from '../CommunityScreen.types';
import { displayAnnouncementDate } from '../CommunityScreen.utils';
import { styles } from './AnnouncementCard.styles';

export function AnnouncementCard({ item, locationName, onPress }: AnnouncementCardProps) {
  const { t } = useTranslation();
  const location = item.locationType === 'outside'
    ? item.outsideLocation?.address
    : locationName || t('community.at_mosque');
  return (
    <TouchableOpacity style={[styles.card, item.isPinned && styles.pinnedCard]} onPress={onPress} activeOpacity={0.82}>
      {item.isPinned && <View style={styles.pinRail} />}
      {item.image ? <Image source={{ uri: resolveMediaUrl(item.image) }} style={styles.image} resizeMode="cover" /> : (
        <View style={styles.placeholder}>
          <MaterialCommunityIcons name="bulletin-board" size={24} color={Colors.border} />
        </View>
      )}
      <View style={styles.body}>
        <View style={styles.meta}>
          {item.isPinned && <PinnedBadge label={t('community.pinned')} />}
          <Text style={styles.date}>{displayAnnouncementDate(item.date)}</Text>
          {!!item.eventDate && (
            <View style={styles.event}>
              <MaterialCommunityIcons name="calendar-star" size={11} color={Colors.accent} />
              <Text style={styles.eventText}>{t('community.event_date', { date: displayAnnouncementDate(item.eventDate) })}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{announcementPlainText(item.descriptionHtml)}</Text>
        {!!location && <CardLocation outside={item.locationType === 'outside'} location={location} />}
      </View>
    </TouchableOpacity>
  );
}

function PinnedBadge({ label }: { label: string }) {
  return <View style={styles.pinnedBadge}><MaterialCommunityIcons name="pin" size={11} color={Colors.background} /><Text style={styles.pinnedText}>{label}</Text></View>;
}

function CardLocation({ outside, location }: { outside: boolean; location: string }) {
  return <View style={styles.location}><MaterialCommunityIcons name={outside ? 'map-marker-outline' : 'mosque'} size={14} color={Colors.accentSoft} /><Text style={styles.locationText} numberOfLines={1}>{location}</Text></View>;
}
