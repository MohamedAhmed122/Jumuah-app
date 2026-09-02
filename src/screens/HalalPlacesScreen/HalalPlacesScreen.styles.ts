import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const createContainerStyle = (topInset: number) => StyleSheet.create({
  inset: { paddingTop: topInset },
}).inset;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  resultHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, marginBottom: 10,
  },
  resultCount: { color: Colors.textSecondary, fontSize: 12 },
  activeFilter: { color: Colors.accent, fontSize: 12, fontWeight: '700' },
});
