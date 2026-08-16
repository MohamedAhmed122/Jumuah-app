import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { CommunityEvent } from '@src/api/events';
import type { AttendanceState } from '../EventDetailScreen.types';
import { styles } from './EventAttendance.styles';

interface Props { event: CommunityEvent; state: AttendanceState; updating: boolean; onJoin: () => void; onLeave: () => void; t: TFunction }

export function EventAttendance({ event, state, updating, onJoin, onLeave, t }: Props) {
  const total = event.capacity ? `${event.attendeeCount} / ${event.capacity}` : String(event.attendeeCount);
  if (state === 'disabled') return null;
  const action = state === 'available' ? onJoin : state === 'joined' ? onLeave : undefined;
  return (
    <View style={styles.container}>
      <View><Text style={styles.count}>{total}</Text><Text style={styles.label}>{t('community.attendees')}</Text></View>
      <TouchableOpacity style={[styles.button, !action && styles.buttonDisabled, state === 'joined' && styles.joined]} disabled={!action || updating} onPress={action}>
        {updating ? <ActivityIndicator size="small" color={Colors.background} /> : <Text style={[styles.buttonText, !action && styles.disabledText]}>{t(`community.event_${state}`)}</Text>}
      </TouchableOpacity>
    </View>
  );
}
