import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerLeft: { flex: 1 },
  headerRight: { width: 70, textAlign: 'center', fontSize: 11, color: Colors.textSecondary },
  row: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  label: { flex: 1, fontSize: 15, color: Colors.textPrimary },
});
