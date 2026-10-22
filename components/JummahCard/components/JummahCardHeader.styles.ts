import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  fridayLabel: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  titleRow: { alignItems: 'center', flexDirection: 'row', gap: 8 },
}));
