import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { CommunityEvent } from '@src/api/events';
import { Colors } from '@constants/Colors';
import { formatEventDate } from '../EventDetailScreen.utils';
import { styles } from './EventMetadata.styles';

export function EventMetadata({ event, location }: { event: CommunityEvent; location: string }) {
  return (
    <>
      <View style={styles.date}><MaterialCommunityIcons name="calendar-clock" size={16} color={Colors.accent} /><Text style={styles.dateText}>{formatEventDate(event.eventDate)}</Text></View>
      <Text style={styles.title}>{event.title}</Text>
      {!!location && <View style={styles.location}><MaterialCommunityIcons name={event.locationType === 'outside' ? 'map-marker-outline' : 'mosque'} size={18} color={Colors.accentSoft} /><Text style={styles.locationText}>{location}</Text></View>}
      {!!event.endDate && <Text style={styles.endDate}>{formatEventDate(event.endDate)}</Text>}
    </>
  );
}
