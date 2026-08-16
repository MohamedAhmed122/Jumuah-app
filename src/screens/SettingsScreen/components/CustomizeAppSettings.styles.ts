import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  row: {
    alignItems: 'center', borderBottomColor: Colors.border, borderBottomWidth: 1,
    flexDirection: 'row', minHeight: 54, paddingHorizontal: 16,
  },
  lastRow: { borderBottomWidth: 0 },
  label: { color: Colors.textPrimary, flex: 1, fontSize: 15 },
  toggleFrame: { height: 31, justifyContent: 'center', width: 51 },
  toggle: { left: 0, position: 'absolute', top: 0 },
});
