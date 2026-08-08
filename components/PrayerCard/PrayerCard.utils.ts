export function formatPrayerTime(time?: Date): string | undefined {
  return time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
