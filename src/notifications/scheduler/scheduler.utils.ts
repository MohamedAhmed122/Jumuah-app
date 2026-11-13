import { format } from 'date-fns';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import type { NotificationToggles } from '@src/stores/settingsStore';
import { REMINDER_LEAD_MS, SCHEDULE_DAY_ANCHOR_HOUR } from './scheduler.constants';
import type { PrayerNotificationPlanItem, ScheduledPrayerDay } from './scheduler.types';

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getScheduleDates(now: Date, dayCount: number): Date[] {
  return Array.from({ length: dayCount }, (_, index) => {
    if (index === 0) return new Date(now);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + index, SCHEDULE_DAY_ANCHOR_HOUR);
  });
}

function buildDayPlan(
  day: ScheduledPrayerDay,
  toggles: NotificationToggles,
): PrayerNotificationPlanItem[] {
  const dateKey = toDateKey(day.date);
  return PRAYER_NAMES.flatMap((prayer) => {
    const toggle = toggles[prayer];
    const prayerTime = day.times[prayer];
    const items: PrayerNotificationPlanItem[] = [];
    if (!toggle) return items;
    if (toggle.reminder) {
      items.push({
        identifier: `prayer:${dateKey}:${prayer}:reminder`,
        prayer, prayerTime, triggerAt: new Date(prayerTime.getTime() - REMINDER_LEAD_MS), type: 'reminder',
      });
    }
    if (toggle.adhan) {
      items.push({
        identifier: `prayer:${dateKey}:${prayer}:adhan`,
        prayer, prayerTime, triggerAt: prayerTime, type: 'adhan',
      });
    }
    return items;
  });
}

export function buildPrayerNotificationPlan(
  days: ScheduledPrayerDay[],
  toggles: NotificationToggles,
  now: Date,
  limit: number | null,
): PrayerNotificationPlanItem[] {
  const plan = days
    .flatMap((day) => buildDayPlan(day, toggles))
    .filter((item) => item.triggerAt.getTime() > now.getTime())
    .sort((first, second) => first.triggerAt.getTime() - second.triggerAt.getTime());
  return limit === null ? plan : plan.slice(0, Math.max(0, limit));
}
