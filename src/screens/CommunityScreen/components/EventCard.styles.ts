import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: Colors.surface, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  pinnedCard: { borderColor: Colors.accent + '88' },
  image: { width: '100%', aspectRatio: 4 / 3 },
  placeholder: { width: '100%', aspectRatio: 4 / 3, backgroundColor: Colors.surfaceElevated, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 10, gap: 6 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  date: { flex: 1, fontSize: 10, color: Colors.accent, fontWeight: '700' },
  title: { fontSize: 14, lineHeight: 18, fontWeight: '700', color: Colors.textPrimary },
  description: { fontSize: 11, lineHeight: 15, color: Colors.textSecondary },
  location: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { flex: 1, fontSize: 10, color: Colors.accentSoft },
  attendance: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 2 },
  attendanceText: { fontSize: 10, color: Colors.textSecondary, fontWeight: '700' },
});
