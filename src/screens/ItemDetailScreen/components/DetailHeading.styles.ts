import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@constants/Colors';
import { createThemedStyles } from '@src/theme';

export const createStatusStyles = (colors: ThemeColors, open: boolean) => StyleSheet.create({
  pill: { backgroundColor: open ? colors.accent + '22' : colors.error + '22' },
  text: { color: open ? colors.accent : colors.error },
});

export const themedStyles = createThemedStyles((colors) => ({
  container: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  titleWrap: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 6, color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
  statusPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  statusText: { fontSize: 12, fontWeight: '700' },
}));
