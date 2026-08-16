import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    flex: 1, position: 'relative', backgroundColor: Colors.surface, borderRadius: 12,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  pinnedCard: { borderColor: Colors.accent + '88' },
  pinRail: {
    position: 'absolute', zIndex: 2, top: 0, bottom: 0,
    left: 0, width: 3, backgroundColor: Colors.accent,
  },
  image: { width: '100%', aspectRatio: 4 / 3 },
  placeholder: {
    width: '100%', aspectRatio: 4 / 3, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: 10, gap: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  date: { fontSize: 10, color: Colors.textSecondary },
  pinnedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.accent,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 7,
  },
  pinnedText: { fontSize: 10, fontWeight: '800', color: Colors.background, textTransform: 'uppercase' },
  event: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  eventText: { fontSize: 10, color: Colors.accent, fontWeight: '600' },
  title: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, lineHeight: 18 },
  description: { fontSize: 11, color: Colors.textSecondary, lineHeight: 15 },
  location: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  locationText: { flex: 1, fontSize: 10, color: Colors.accentSoft },
});
