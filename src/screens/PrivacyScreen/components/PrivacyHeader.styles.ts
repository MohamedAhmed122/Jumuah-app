import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  header: { marginBottom: 24 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 16 },
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '700', marginTop: 12 },
  subtitle: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
}));
