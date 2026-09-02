import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 15 },
  box: {
    flex: 1, height: 50, borderRadius: 15, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, gap: 9,
  },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 14, paddingVertical: 0 },
  filterButton: {
    width: 50, height: 50, borderRadius: 15, backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  filterDot: {
    position: 'absolute', right: 7, top: 7, width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.error, borderWidth: 1, borderColor: Colors.background,
  },
});
