import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { AGENDA_COLORS } from '../CommunityAgendaScreen.constants';

export const styles = StyleSheet.create({
  card: {
    minHeight: 88, marginHorizontal: 20, marginTop: 16, marginBottom: 6, padding: 14, gap: 10,
    borderRadius: 13, borderWidth: 1, borderLeftWidth: 4, backgroundColor: Colors.surface,
  },
  firstCard: { marginTop: 32 },
  eventCard: { borderColor: Colors.border, borderLeftColor: AGENDA_COLORS.event },
  announcementCard: { borderColor: Colors.border, borderLeftColor: AGENDA_COLORS.announcement },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 8 },
  eventBadge: { backgroundColor: AGENDA_COLORS.event },
  announcementBadge: { backgroundColor: AGENDA_COLORS.announcement + '33' },
  badgeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  eventBadgeText: { color: Colors.background },
  announcementBadgeText: { color: AGENDA_COLORS.announcement },
  time: { color: Colors.textSecondary, fontSize: 12, fontWeight: '700' },
  title: { color: Colors.textPrimary, fontSize: 15, lineHeight: 20, fontWeight: '700' },
});
