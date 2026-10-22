import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  iqamaBlock: { borderLeftColor: colors.border, borderLeftWidth: 1, paddingLeft: 12 },
  iqamaTime: { color: colors.iqamaTime, fontSize: 18, fontWeight: '700' },
  label: {
    color: colors.textSecondary,
    fontSize: 9,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  row: { alignItems: 'flex-end', flexDirection: 'row', gap: 18, marginTop: 8 },
  time: { color: colors.prayerTime, fontSize: 22, fontWeight: '700' },
  timeActive: { color: colors.accent },
}));
