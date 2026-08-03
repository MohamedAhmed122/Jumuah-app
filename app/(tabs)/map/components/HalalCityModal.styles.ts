import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#00000099', paddingHorizontal: 20,
  },
  backdrop: StyleSheet.absoluteFillObject,
  modal: {
    width: '100%', maxHeight: '72%', backgroundColor: Colors.surface,
    borderRadius: 22, padding: 18, borderWidth: 1, borderColor: Colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { color: Colors.textPrimary, fontSize: 22, fontWeight: '800' },
  currentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14,
    borderRadius: 12, backgroundColor: Colors.accent + '18', marginBottom: 8,
  },
  currentText: { color: Colors.accent, fontWeight: '700' },
  list: { flexGrow: 0 },
  row: {
    minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: Colors.border, paddingHorizontal: 4,
  },
  city: { color: Colors.textSecondary, fontSize: 15 },
  cityActive: { color: Colors.accent, fontWeight: '700' },
});
