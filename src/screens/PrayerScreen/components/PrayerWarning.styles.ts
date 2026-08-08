import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.accentSoft, borderWidth: 1, borderRadius: 12,
    padding: 14, marginBottom: 14, gap: 12,
  },
  text: { flex: 1 },
  title: { fontSize: 13, fontWeight: '700', color: Colors.accentSoft, marginBottom: 2 },
  body: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
});
