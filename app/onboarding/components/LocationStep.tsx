import type { ActionStepProps } from '../OnboardingScreen.types';
import { PermissionStep } from './PermissionStep';

export function LocationStep(props: ActionStepProps) {
  return (
    <PermissionStep
      {...props}
      icon="map-marker-radius"
      titleKey="onboarding.allow_location_title"
      bodyKey="onboarding.allow_location_body"
      allowKey="onboarding.allow_location_button"
      skipKey="onboarding.allow_location_skip"
    />
  );
}
