import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  bearing: { color: colors.accent, fontSize: 32, fontWeight: '700' },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 18,
  },
  label: { color: colors.textSecondary, fontSize: 13 },
}));
