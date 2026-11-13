import { createThemedStyles } from '@src/theme';

import { themedStyles as themedStepStyles } from './OnboardingStep.styles';

export { themedStepStyles };
export { themedStyles as themedChoiceStyles } from './ChoiceCard.styles';
export const themedStyles = createThemedStyles(() => ({
  flag: { fontSize: 40 },
}));
