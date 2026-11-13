import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  gregorian: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  hijri: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  labels: { alignItems: 'center' },
  navigation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 16,
  },
}));
