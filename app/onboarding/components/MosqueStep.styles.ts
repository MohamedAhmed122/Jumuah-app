import { createThemedStyles } from '@src/theme';

import { themedStyles as themedStepStyles } from './OnboardingStep.styles';

export { themedStepStyles };
export const themedStyles = createThemedStyles((colors) => ({
  state: { width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 20 },
  loading: { color: colors.textSecondary, fontSize: 14 },
  error: { color: colors.error, fontSize: 14, textAlign: 'center' },
  list: { width: '100%', flex: 1, marginBottom: 12 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, gap: 10,
  },
  rowActive: { borderColor: colors.accent, backgroundColor: colors.surfaceElevated },
  rowText: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.textSecondary, marginBottom: 3 },
  nameActive: { color: colors.textPrimary },
  address: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
  empty: { color: colors.textSecondary, textAlign: 'center', paddingVertical: 20 },
}));
