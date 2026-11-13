import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 20 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.border },
  active: { backgroundColor: colors.accent, width: 22 },
}));
