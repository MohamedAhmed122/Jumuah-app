import type { TFunction } from 'i18next';
import type { PrayerTimes } from '@src/prayer/calculator';
import { PrayerWarning } from './PrayerWarning';

interface Props {
  times: PrayerTimes;
  showHighLatitude: boolean;
  showShortAsr: boolean;
  dismissHighLatitude: () => void;
  dismissShortAsr: () => void;
  t: TFunction;
}

export function PrayerWarnings(props: Props) {
  const { times, showHighLatitude, showShortAsr, dismissHighLatitude, dismissShortAsr, t } = props;
  return (
    <>
      <PrayerWarning
        visible={showHighLatitude && times.meta.highLatitudeFallback}
        title={t('prayer.summer_banner_title')}
        body={t('prayer.summer_banner_body')}
        onDismiss={dismissHighLatitude}
      />
      <PrayerWarning
        visible={showShortAsr && times.meta.isAsrWindowShort}
        title={t('prayer.asr_short_title')}
        body={t('prayer.asr_short_body', { minutes: times.meta.asrWindowMinutes })}
        onDismiss={dismissShortAsr}
      />
    </>
  );
}
