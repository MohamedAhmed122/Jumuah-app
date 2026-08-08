import { normalizeHour } from './calculator.math';

export function hourToDate(baseDate: Date, fractionalHour: number): Date {
  const normalizedHour = normalizeHour(fractionalHour);
  const hours = Math.floor(normalizedHour);
  const minutes = Math.floor((normalizedHour - hours) * 60);
  const seconds = Math.round((((normalizedHour - hours) * 60) - minutes) * 60);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, seconds, 0);
  return date;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function ceilToMinute(date: Date) {
  const roundedDate = new Date(date);
  if (roundedDate.getSeconds() > 0 || roundedDate.getMilliseconds() > 0) {
    roundedDate.setMinutes(roundedDate.getMinutes() + 1);
  }
  roundedDate.setSeconds(0, 0);
  return roundedDate;
}
