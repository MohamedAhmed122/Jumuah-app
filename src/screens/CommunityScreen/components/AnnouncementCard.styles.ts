import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    position: 'relative', backgroundColor: Colors.surface, borderRadius: 14,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  pinnedCard: { borderColor: Colors.accent + '88' },
  pinRail: {
    position: 'absolute', zIndex: 2, top: 0, bottom: 0,
    left: 0, width: 3, backgroundColor: Colors.accent,
  },
  image: { width: '100%', aspectRatio: 16 / 9 },
  placeholder: {
    width: '100%', aspectRatio: 16 / 9, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: 14, gap: 7 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  date: { fontSize: 12, color: Colors.textSecondary },
  pinnedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.accent,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  pinnedText: { fontSize: 10, fontWeight: '800', color: Colors.background, textTransform: 'uppercase' },
  event: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.accent + '22',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  eventText: { fontSize: 11, color: Colors.accent, fontWeight: '600' },
  title: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, lineHeight: 23 },
  description: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  location: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  locationText: { flex: 1, fontSize: 12, color: Colors.accentSoft },
});
