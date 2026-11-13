import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  section: {
    backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14,
    borderWidth: 1, marginBottom: 12, padding: 18,
  },
  title: { color: colors.accentSoft, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { color: colors.textPrimary, fontSize: 14, lineHeight: 21 },
}));
