import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  button: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  buttonDisabled: { opacity: 0.3 },
  controls: { alignItems: 'center', flexDirection: 'row', gap: 16 },
  count: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'center',
  },
  outstanding: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 16,
    minWidth: 80,
    textAlign: 'right',
  },
  prayerName: { color: colors.textPrimary, flex: 1, fontSize: 16, fontWeight: '600' },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
}));
