import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { flexDirection: 'row', gap: 10, padding: 12 },
  button: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1.5, borderColor: colors.border, alignItems: 'center',
  },
  buttonActive: { borderColor: colors.accent, backgroundColor: colors.surfaceElevated },
  text: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  textActive: { color: colors.textPrimary },
}));
