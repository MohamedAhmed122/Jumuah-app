import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tabs: { flex: 1, flexDirection: 'row', padding: 3, borderRadius: 12, backgroundColor: Colors.surface },
  tab: { flex: 1, minHeight: 36, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  tabActive: { backgroundColor: Colors.surfaceElevated },
  tabText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: Colors.textPrimary, fontWeight: '800' },
  filter: { minWidth: 64, minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.surface },
  count: { color: Colors.textPrimary, fontSize: 12, fontWeight: '800' },
});
