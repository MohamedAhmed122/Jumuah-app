import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { CommunityEvent } from '@src/api/events';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { formatEventDate } from '../EventDetailScreen.utils';
import { themedStyles } from './EventMetadata.styles';

export function EventMetadata({ event, location }: { event: CommunityEvent; location: string }) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <>
      <View style={styles.date}><MaterialCommunityIcons name="calendar-clock" size={16} color={colors.accent} /><Text style={styles.dateText}>{formatEventDate(event.eventDate)}</Text></View>
      <Text style={styles.title}>{event.title}</Text>
      {!!location && <View style={styles.location}><MaterialCommunityIcons name={event.locationType === 'outside' ? 'map-marker-outline' : 'mosque'} size={18} color={colors.accentSoft} /><Text style={styles.locationText}>{location}</Text></View>}
      {!!event.endDate && <Text style={styles.endDate}>{formatEventDate(event.endDate)}</Text>}
    </>
  );
}
