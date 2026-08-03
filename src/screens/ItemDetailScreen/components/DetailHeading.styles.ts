import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createStatusStyles = (open: boolean) => StyleSheet.create({
  pill: { backgroundColor: open ? Colors.accent + '22' : Colors.error + '22' },
  text: { color: open ? Colors.accent : Colors.error },
});

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  titleWrap: { flex: 1 },
  title: { color: Colors.textPrimary, fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 6, color: Colors.textSecondary, fontSize: 14, lineHeight: 20 },
  statusPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  statusText: { fontSize: 12, fontWeight: '700' },
});
