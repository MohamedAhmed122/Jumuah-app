import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    alignItems: 'center', borderBottomColor: Colors.border, borderBottomWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14,
    paddingHorizontal: 20,
  },
  title: { color: Colors.textPrimary, fontSize: 22, fontWeight: '700' },
  close: {
    alignItems: 'center', backgroundColor: Colors.surfaceElevated,
    borderRadius: 20, height: 40, justifyContent: 'center', width: 40,
  },
  scroll: { padding: 20, paddingBottom: 48 },
});
