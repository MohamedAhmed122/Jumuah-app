import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toHijri } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';
import { toAdhkarBreakView, toAdhkarView, toPrayingView } from '../TvPrayerScreen.adhkarView';
import { getAlertState } from '../TvPrayerScreen.alerts';
import { buildTvDays, getDisplayDates, toDateKey } from '../TvPrayerScreen.days';
import { formatClockSeconds, formatLongDate, formatTime, toPercent } from '../TvPrayerScreen.format';
import { buildAlertEvents, buildPrayerCards, findNextEvent, selectCardDay } from '../TvPrayerScreen.schedule';
import { toAlertView, toCardViews, toNextView } from '../TvPrayerScreen.view';
import { useAlertSounds } from './useAlertSounds';
import { useAlignedClock } from './useAlignedClock';
import { useDisplayCycle } from './useDisplayCycle';
import { useStageStyles } from './useStageStyles';
import { useTvAnnouncements } from './useTvAnnouncements';
import { useTvDisplayMode } from './useTvDisplayMode';
import { useTvMenu } from './useTvMenu';
import { useTvMenuOptions } from './useTvMenuOptions';
import { useTvMosque } from './useTvMosque';
import { useTvTimetable } from './useTvTimetable';

export function useTvPrayerScreen() {
  useTvDisplayMode();
  const { t } = useTranslation();
  const now = useAlignedClock();
  const [sessionStart] = useState(() => Date.now());
  const language = useSettingsStore((state) => state.appLanguage);
  const coordinates = useSettingsStore((state) => state.userCoordinates);
  const announcementsEnabled = useSettingsStore((state) => state.tvAnnouncementsEnabled);
  const slideSeconds = useSettingsStore((state) => state.tvAnnouncementSeconds);
  const { mosques, mosque, mosqueId } = useTvMosque();
  const todayKey = toDateKey(now);
  const dates = useMemo(() => getDisplayDates(new Date(`${todayKey}T12:00:00`)), [todayKey]);
  const timetable = useTvTimetable(mosqueId, toDateKey(dates[0]), toDateKey(dates[2]));
  const feed = useTvAnnouncements(mosqueId, language, mosques, t);
  const days = useMemo(
    () => buildTvDays(dates, coordinates, mosque, timetable.timetable),
    [dates, coordinates, mosque, timetable.timetable],
  );
  const events = useMemo(() => days.flatMap(buildAlertEvents), [days]);
  const alert = getAlertState(events, now.getTime(), sessionStart);
  const next = findNextEvent(days, now);
  const menu = useTvMenu(!alert);
  const menuOptions = useTvMenuOptions(mosques);
  const cycle = useDisplayCycle({
    now, alertActive: !!alert, menuOpen: menu.menuOpen, enabled: announcementsEnabled,
    count: feed.slides.length, slideSeconds,
  });
  useAlertSounds(alert);

  const hijri = toHijri(now, language);
  return {
    t,
    stageStyles: useStageStyles(),
    mode: alert?.phase ?? cycle.mode,
    menu,
    menuOptions,
    header: {
      mosqueLine: mosque ? `${mosque.name} · ${mosque.city}` : `${t('onboarding.app_name')} ${t('onboarding.app_name_sub')}`,
      dateLine: `${formatLongDate(now, language)} · ${hijri.day} ${hijri.monthName} ${hijri.year}`,
      clock: formatTime(now),
      seconds: formatClockSeconds(now),
      offline: !timetable.online || !feed.online,
    },
    next: toNextView(next, now, t),
    cards: toCardViews(buildPrayerCards(selectCardDay(days, next)), next, now, t),
    alert: alert ? toAlertView(alert, t) : null,
    praying: alert?.phase === 'praying' ? toPrayingView(alert, t) : null,
    adhkar: alert ? toAdhkarView(alert, t) : null,
    adhkarBreak: alert ? toAdhkarBreakView(alert, t) : null,
    announcements: {
      slides: feed.slides,
      index: Math.min(cycle.slideIndex, Math.max(feed.slides.length - 1, 0)),
      progressPercent: toPercent(cycle.slideElapsedMs, cycle.slideDurationMs),
      counter: `${Math.min(cycle.slideIndex + 1, feed.slides.length)} / ${feed.slides.length}`,
    },
  };
}
