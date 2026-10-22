import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  label: { color: colors.textSecondary, fontSize: 10, marginBottom: 4 },
  service: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  time: { color: colors.iqamaTime, fontSize: 18, fontWeight: '700' },
}));
