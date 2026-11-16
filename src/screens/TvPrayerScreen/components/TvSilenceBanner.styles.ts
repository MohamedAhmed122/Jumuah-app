import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  banner: {
    alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 28, borderWidth: 2,
    flexDirection: 'row', gap: 20, justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 26,
  },
  text: { color: colors.textPrimary, fontSize: 42, fontWeight: '500' },
}));
