import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', padding: 16, backgroundColor: '#00000099' },
  sheet: { maxHeight: '72%', padding: 18, gap: 14, borderRadius: 18, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: Colors.textPrimary, fontSize: 19, fontWeight: '800' },
  city: { color: Colors.accentSoft, fontSize: 12, marginTop: 2 },
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  check: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 7, borderWidth: 1, borderColor: Colors.border },
  checkActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  copy: { flex: 1 },
  name: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  address: { color: Colors.textSecondary, fontSize: 11, marginTop: 2 },
  hint: { color: Colors.textSecondary, fontSize: 11, textAlign: 'center' },
});
