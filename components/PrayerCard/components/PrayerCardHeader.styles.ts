import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  name: { color: colors.prayerName, fontSize: 16, fontWeight: '600' },
  nameActive: { color: colors.textPrimary },
  right: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
}));
