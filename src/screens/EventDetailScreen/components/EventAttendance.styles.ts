import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  count: { color: colors.textPrimary, fontSize: 18, fontWeight: '800' },
  label: { color: colors.textSecondary, fontSize: 11 },
  button: { minWidth: 110, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderRadius: 12, backgroundColor: colors.accent },
  joined: { backgroundColor: colors.accentSoft },
  buttonDisabled: { backgroundColor: colors.surfaceElevated },
  buttonText: { color: colors.onAccent, fontSize: 13, fontWeight: '800' },
  disabledText: { color: colors.textSecondary },
}));
