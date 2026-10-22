import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  primary: {
    width: '100%', backgroundColor: colors.accent, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  primaryText: { fontSize: 16, fontWeight: '700', color: colors.onAccent },
  secondary: { paddingVertical: 14, marginTop: 4 },
  secondaryText: { fontSize: 15, color: colors.textSecondary },
}));
