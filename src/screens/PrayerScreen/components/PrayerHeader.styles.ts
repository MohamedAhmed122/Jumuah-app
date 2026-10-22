import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  hijri: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  gregorian: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12 },
  button: { padding: 6 },
}));
