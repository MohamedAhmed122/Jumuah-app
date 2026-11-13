import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    paddingVertical: 24,
  },
  label: { color: colors.textSecondary, fontSize: 14, marginTop: 4 },
  total: { color: colors.accent, fontSize: 52, fontWeight: '200' },
}));
