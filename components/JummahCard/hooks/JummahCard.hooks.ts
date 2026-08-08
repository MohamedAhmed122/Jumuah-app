import { useTranslation } from 'react-i18next';

import { JUMMAH_SERVICE_KEYS } from '../JummahCard.constants';
import type { JummahCardViewModel } from '../JummahCard.types';
import { formatJummahTime } from '../JummahCard.utils';

export function useJummahCard(times: Date[]): JummahCardViewModel {
  const { t } = useTranslation();

  return {
    fridayLabel: t('prayer.friday'),
    services: times.map((time, index) => ({
      key: `${time.toISOString()}-${index}`,
      label: t(`prayer.${JUMMAH_SERVICE_KEYS[index]}`),
      time: formatJummahTime(time),
    })),
    title: t('prayer.jummah'),
  };
}
