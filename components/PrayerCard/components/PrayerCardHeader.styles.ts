import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  name: { color: Colors.textSecondary, fontSize: 16, fontWeight: '600' },
  nameActive: { color: Colors.textPrimary },
  right: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
});
