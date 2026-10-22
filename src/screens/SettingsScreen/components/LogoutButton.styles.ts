import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1,
    borderColor: colors.error, paddingVertical: 14,
  },
  text: { fontSize: 15, fontWeight: '700', color: colors.error },
}));
