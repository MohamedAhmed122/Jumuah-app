import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  listCentered: { alignItems: 'center', justifyContent: 'center', gap: 12, padding: 48 },
  loading: { color: colors.textSecondary, fontSize: 14 },
  error: { color: colors.textSecondary, fontSize: 15, textAlign: 'center' },
  icon: {
    width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.accent + '18', borderWidth: 1, borderColor: colors.accent + '44',
  },
  title: { fontSize: 19, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  text: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  button: {
    marginTop: 4, paddingHorizontal: 24, paddingVertical: 11,
    borderRadius: 20, backgroundColor: colors.accent,
  },
  buttonText: { color: colors.onAccent, fontWeight: '700', fontSize: 14 },
}));
