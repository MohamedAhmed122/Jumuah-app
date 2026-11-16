import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  disabled: { opacity: 0.4 },
  heading: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  headingText: { color: colors.textSecondary, fontSize: 24, fontWeight: '500', letterSpacing: 2, textTransform: 'uppercase' },
  half: { flex: 1 },
  section: { gap: 12 },
}));
