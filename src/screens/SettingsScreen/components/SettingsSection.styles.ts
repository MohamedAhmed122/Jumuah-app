import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  section: { marginBottom: 24 },
  label: {
    fontSize: 12, fontWeight: '700', color: colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  body: {
    backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1,
    borderColor: colors.border, overflow: 'hidden',
  },
}));
