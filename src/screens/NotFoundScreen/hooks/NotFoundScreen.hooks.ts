import { useTranslation } from 'react-i18next';

export function useNotFoundScreen() {
  const { t } = useTranslation();

  return {
    body: t('errors.not_found_body'),
    homeLabel: t('errors.go_home'),
    screenOptions: { title: t('errors.not_found_title') },
  };
}
