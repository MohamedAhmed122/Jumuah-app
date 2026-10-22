import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { announcementPlainText } from '@src/api/announcements';
import { resolveMediaUrl } from '@src/api/media';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { EventCardProps } from '../CommunityScreen.types';
import { displayEventDate } from '../CommunityScreen.utils';
import { themedStyles } from './EventCard.styles';

export function EventCard({ item, locationName, onPress }: EventCardProps) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <TouchableOpacity style={[styles.card, item.isPinned && styles.pinnedCard]} onPress={onPress} activeOpacity={0.82}>
      {item.image ? <Image source={{ uri: resolveMediaUrl(item.image) }} style={styles.image} /> : (
        <View style={styles.placeholder}><MaterialCommunityIcons name="calendar-star" size={24} color={colors.border} /></View>
      )}
      <View style={styles.body}>
        <View style={styles.dateRow}>
          <MaterialCommunityIcons name="calendar-clock" size={12} color={colors.accent} />
          <Text style={styles.date}>{displayEventDate(item.eventDate)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{announcementPlainText(item.descriptionHtml)}</Text>
        {!!locationName && <View style={styles.location}><MaterialCommunityIcons name={item.locationType === 'outside' ? 'map-marker-outline' : 'mosque'} size={13} color={colors.accentSoft} /><Text style={styles.locationText} numberOfLines={1}>{locationName}</Text></View>}
        <View style={styles.attendance}><Text style={styles.attendanceText}>{item.attendeeCount}{item.capacity ? ` / ${item.capacity}` : ''}</Text>{item.joined && <MaterialCommunityIcons name="check-circle" size={14} color={colors.accent} />}</View>
      </View>
    </TouchableOpacity>
  );
}
