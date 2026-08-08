import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  buttonDisabled: { opacity: 0.3 },
  controls: { alignItems: 'center', flexDirection: 'row', gap: 16 },
  count: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'center',
  },
  outstanding: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginLeft: 16,
    minWidth: 80,
    textAlign: 'right',
  },
  prayerName: { color: Colors.textPrimary, flex: 1, fontSize: 16, fontWeight: '600' },
  row: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
