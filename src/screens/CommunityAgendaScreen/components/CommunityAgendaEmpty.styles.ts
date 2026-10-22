import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 28, backgroundColor: colors.background },
  text: { color: colors.textSecondary, fontSize: 14, textAlign: 'center' },
}));
