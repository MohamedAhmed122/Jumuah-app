import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: { flexDirection: 'row', gap: 10, marginTop: 8 },
  button: {
    flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1,
    borderRadius: 12, alignItems: 'center', paddingVertical: 14, gap: 6,
  },
  label: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },
}));
