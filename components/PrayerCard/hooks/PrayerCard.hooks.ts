import { useTranslation } from 'react-i18next';

import type { PrayerCardProps, PrayerCardViewModel } from '../PrayerCard.types';
import { formatPrayerTime } from '../PrayerCard.utils';

export function usePrayerCard(props: PrayerCardProps): PrayerCardViewModel {
  const { t } = useTranslation();

  return {
    adhanEnabled: props.adhanEnabled,
    adhanLabel: t('prayer.adhan'),
    hasPassed: props.hasPassed,
    iqamaLabel: t('prayer.iqama'),
    iqamaTime: formatPrayerTime(props.iqamaTime),
    isActive: props.isActive,
    isNext: props.isNext,
    missedLabel: t('tracker.no'),
    onAdhanToggle: props.onAdhanToggle,
    onMissed: () => props.onLog(false),
    onPrayed: () => props.onLog(true),
    onReminderToggle: props.onReminderToggle,
    prayer: props.prayer,
    prayerLabel: t(`prayer.${props.prayer}`),
    prayedLabel: t('tracker.yes'),
    reminderEnabled: props.reminderEnabled,
    showLogActions: props.hasPassed && props.status === null,
    status: props.status,
    time: formatPrayerTime(props.time) ?? '',
  };
}
