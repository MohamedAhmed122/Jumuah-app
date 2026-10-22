import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  card: {
    backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1,
    borderColor: colors.border, padding: 16, marginBottom: 14,
  },
  title: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 14 },
}));
