import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  text: { color: Colors.textSecondary, textAlign: 'center' },
  retry: { backgroundColor: Colors.accent, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 20 },
  retryText: { color: Colors.background, fontWeight: '700' },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 },
  emptyTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
  emptyBody: { color: Colors.textSecondary, fontSize: 13 },
});
