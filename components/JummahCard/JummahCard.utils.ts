export function formatJummahTime(time: Date): string {
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
