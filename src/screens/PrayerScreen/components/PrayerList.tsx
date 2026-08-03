import { JummahCard } from '@components/JummahCard';
import { PrayerCard } from '@components/PrayerCard';
import { PRAYER_NAMES, type PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';
import type { IqamaTimes } from '@src/prayer/mosqueTimes';
import type { NotificationToggles } from '@src/stores/settingsStore';
import type { PrayerLogMap, ScheduledPrayer } from '../PrayerScreen.types';

interface Props {
  times: PrayerTimes;
  iqamaTimes: IqamaTimes;
  jummahTimes: Date[];
  activePrayer: PrayerName | null;
  nextPrayer: ScheduledPrayer | null;
  logs: PrayerLogMap;
  toggles: NotificationToggles;
  onToggle: (prayer: PrayerName, type: 'adhan' | 'reminder') => void;
  onLog: (prayer: PrayerName, prayed: boolean) => void;
}

export function PrayerList(props: Props) {
  const { times, iqamaTimes, jummahTimes, activePrayer, nextPrayer, logs, toggles, onToggle, onLog } = props;
  return PRAYER_NAMES.map((prayer) => {
    if (prayer === 'dhuhr' && jummahTimes.length > 0) {
      return <JummahCard key="jummah" times={jummahTimes} isNext={nextPrayer?.name === 'jummah'} />;
    }
    return (
      <PrayerCard
        key={prayer}
        prayer={prayer}
        time={times[prayer]}
        iqamaTime={iqamaTimes[prayer]}
        isActive={activePrayer === prayer}
        isNext={nextPrayer?.name === prayer}
        hasPassed={times[prayer] <= new Date()}
        status={logs[prayer] ?? null}
        adhanEnabled={toggles[prayer]?.adhan ?? true}
        reminderEnabled={toggles[prayer]?.reminder ?? true}
        onAdhanToggle={() => onToggle(prayer, 'adhan')}
        onReminderToggle={() => onToggle(prayer, 'reminder')}
        onLog={(prayed) => onLog(prayer, prayed)}
      />
    );
  });
}
