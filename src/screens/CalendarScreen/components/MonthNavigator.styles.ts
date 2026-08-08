import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  gregorian: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
  hijri: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  labels: { alignItems: 'center' },
  navigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 16,
  },
});
