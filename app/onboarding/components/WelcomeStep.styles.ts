import { createThemedStyles } from '@src/theme';

import { themedStyles as themedStepStyles } from './OnboardingStep.styles';

export { themedStepStyles };
export const themedStyles = createThemedStyles((colors) => ({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  bismillah: { fontSize: 28, color: colors.accent, textAlign: 'center', marginBottom: 8, lineHeight: 44 },
  appName: { fontSize: 32, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  appNameSub: {
    fontSize: 20, fontWeight: '300', color: colors.accentSoft,
    letterSpacing: 4, textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15, color: colors.textSecondary, textAlign: 'center',
    marginTop: 8, lineHeight: 22,
  },
  privacyLink: {
    fontSize: 13, color: colors.accentSoft, textAlign: 'center',
    textDecorationLine: 'underline', marginTop: 16,
  },
}));
