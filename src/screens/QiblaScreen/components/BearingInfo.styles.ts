import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  bearing: { color: Colors.accent, fontSize: 32, fontWeight: '700' },
  card: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 18,
  },
  label: { color: Colors.textSecondary, fontSize: 13 },
});
