import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  date: { fontSize: 13, color: Colors.textSecondary },
  event: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.accent + '22',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  eventText: { fontSize: 11, color: Colors.accent, fontWeight: '600' },
  pinned: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.accent,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  pinnedText: {
    fontSize: 10, fontWeight: '800', color: Colors.background, textTransform: 'uppercase',
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, lineHeight: 32 },
});
