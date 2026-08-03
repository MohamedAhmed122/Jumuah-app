import type { ActionStepProps } from '../OnboardingScreen.types';
import { PermissionStep } from './PermissionStep';

export function NotificationStep(props: ActionStepProps) {
  return (
    <PermissionStep
      {...props}
      icon="bell-ring"
      titleKey="onboarding.allow_notifications_title"
      bodyKey="onboarding.allow_notifications_body"
      allowKey="onboarding.allow_notifications_button"
      skipKey="onboarding.allow_notifications_skip"
    />
  );
}
