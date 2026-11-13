import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  step: {
    flex: 1, paddingHorizontal: 28, paddingTop: 32,
    paddingBottom: 16, alignItems: 'center',
  },
  icon: { marginBottom: 24, marginTop: 16 },
  title: {
    fontSize: 24, fontWeight: '700', color: colors.textPrimary,
    textAlign: 'center', marginBottom: 14,
  },
  body: {
    fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22,
    marginBottom: 32, paddingHorizontal: 8,
  },
}));
