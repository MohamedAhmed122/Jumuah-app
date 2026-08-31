import { router, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingPermissions } from '@src/screens/OnboardingScreen/hooks/useOnboardingPermissions';
import { useMosqueSelection } from './useMosqueSelection';
import { useOnboardingCompletion } from './useOnboardingCompletion';
import { useOnboardingNavigation } from './useOnboardingNavigation';

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
  const openPrivacy = () => router.push('/privacy' as Href);

  return { t, insets, navigation, mosque, permissions, completion, openPrivacy };
}
