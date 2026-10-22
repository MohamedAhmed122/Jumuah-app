import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  friday: { color: colors.accent },
  label: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  row: { flexDirection: 'row', marginBottom: 6, paddingHorizontal: 10 },
}));
