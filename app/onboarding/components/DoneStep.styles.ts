import { createThemedStyles } from '@src/theme';

import { themedStyles as themedStepStyles } from './OnboardingStep.styles';

export { themedStepStyles };
export const themedStyles = createThemedStyles((colors) => ({
  checkCircle: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', marginBottom: 28, marginTop: 16,
  },
  teaser: {
    backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1,
    borderRadius: 16, paddingVertical: 20, paddingHorizontal: 28,
    alignItems: 'center', marginBottom: 32, gap: 4,
  },
  teaserLabel: { fontSize: 13, color: colors.textSecondary },
  teaserPrayer: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  teaserTime: { fontSize: 17, color: colors.accent },
}));
