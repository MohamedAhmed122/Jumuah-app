import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { fontSize: 14, color: colors.accent },
}));
