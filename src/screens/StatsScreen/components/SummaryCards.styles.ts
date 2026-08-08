import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createProgressStyle = (percentage: number) => StyleSheet.create({
  opacity: { opacity: percentage / 100 },
}).opacity;

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  card: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, alignItems: 'center', paddingVertical: 20, gap: 8,
  },
  ring: {
    width: 90, height: 90, borderRadius: 45, borderWidth: 8, borderColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  ringFill: {
    ...StyleSheet.absoluteFillObject, borderRadius: 45, backgroundColor: 'rgba(61,214,140,0.15)',
  },
  percentage: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  label: { fontSize: 12, color: Colors.textSecondary },
  streakCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: Colors.border, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20, gap: 4,
  },
  streak: { fontSize: 42, fontWeight: '700', color: Colors.textPrimary },
});
