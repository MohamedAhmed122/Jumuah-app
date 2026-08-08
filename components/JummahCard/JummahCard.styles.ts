import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardNext: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.accent,
  },
});
