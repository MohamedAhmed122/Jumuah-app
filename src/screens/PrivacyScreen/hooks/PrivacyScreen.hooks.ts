import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIVACY_SECTION_KEYS } from '../PrivacyScreen.constants';

export function usePrivacyScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const sections = PRIVACY_SECTION_KEYS.map((key) => ({
    key,
    title: t(`privacy.sections.${key}.title`),
    body: t(`privacy.sections.${key}.body`),
  }));

  return { t, insets, sections, goBack: router.back };
}
