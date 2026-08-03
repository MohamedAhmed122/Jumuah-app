import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMosqueSelection } from './useMosqueSelection';
import { useOnboardingCompletion } from './useOnboardingCompletion';
import { useOnboardingNavigation } from './useOnboardingNavigation';
import { useOnboardingPermissions } from './useOnboardingPermissions';

export function useOnboardingScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useOnboardingNavigation();
  const mosque = useMosqueSelection();
  const permissions = useOnboardingPermissions({
    goTo: navigation.goTo,
    loadMosques: mosque.loadMosques,
  });
  const completion = useOnboardingCompletion({ goTo: navigation.goTo, t });

  return { t, insets, navigation, mosque, permissions, completion };
}
