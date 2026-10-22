import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  row: { marginTop: 4 },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 14, borderRadius: 14, backgroundColor: colors.accent,
  },
  text: { color: colors.onAccent, fontSize: 15, fontWeight: '700' },
}));
