import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { CommunityAgendaItem } from '../CommunityAgendaScreen.types';
import { styles } from './CommunityAgendaCard.styles';

interface Props { first: boolean; item: CommunityAgendaItem; onPress: () => void; t: TFunction }

export function CommunityAgendaCard({ first, item, onPress, t }: Props) {
  const event = item.type === 'event';
  return (
    <TouchableOpacity style={[styles.card, first && styles.firstCard, event ? styles.eventCard : styles.announcementCard]} onPress={onPress} activeOpacity={0.84}>
      <View style={styles.heading}>
        <View style={[styles.badge, event ? styles.eventBadge : styles.announcementBadge]}>
          <MaterialCommunityIcons name={event ? 'calendar-star' : 'bullhorn-outline'} size={12} color={event ? Colors.background : Colors.textPrimary} />
          <Text style={[styles.badgeText, event ? styles.eventBadgeText : styles.announcementBadgeText]}>{t(event ? 'community.event' : 'community.announcement')}</Text>
        </View>
        {!!item.time && <Text style={styles.time}>{item.time}</Text>}
      </View>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
  );
}
