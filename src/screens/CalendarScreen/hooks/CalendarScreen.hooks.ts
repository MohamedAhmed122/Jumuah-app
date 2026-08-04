import { useState } from 'react';
import { addMonths, startOfMonth, subMonths } from 'date-fns';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { toHijri } from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';

import { LEGEND_EVENTS } from '../CalendarScreen.constants';
import { createSafeAreaStyle } from '../CalendarScreen.styles';
import type { CalendarScreenViewModel } from '../CalendarScreen.types';
import { buildCalendarCells } from '../CalendarScreen.utils';

export function useCalendarScreen(): CalendarScreenViewModel {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const language = useSettingsStore((state) => state.appLanguage);
  const [monthStart, setMonthStart] = useState(() => startOfMonth(new Date()));
  const today = new Date();
  const hijriMonth = toHijri(monthStart, language);

  return {
    cells: buildCalendarCells(monthStart, language, today),
    gregorianMonth: monthStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
    hijriMonth: `${hijriMonth.monthName} ${hijriMonth.year}`,
    legend: LEGEND_EVENTS.map((event) => ({ event, label: t(`calendar.${event}`) })),
    onBack: () => router.back(),
    onNextMonth: () => setMonthStart((month) => addMonths(month, 1)),
    onPreviousMonth: () => setMonthStart((month) => subMonths(month, 1)),
    rootStyle: createSafeAreaStyle(insets.top),
    title: t('calendar.title'),
  };
}
