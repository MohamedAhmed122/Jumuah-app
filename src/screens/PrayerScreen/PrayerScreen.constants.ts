export const QUICK_ACTIONS = [
  { route: '/tracker', icon: 'check-circle-outline', labelKey: 'tracker.title', visibilityKey: 'prayerTracker' },
  { route: '/qada', icon: 'redo-variant', labelKey: 'qada.title', visibilityKey: 'prayerQada' },
  { route: '/stats', icon: 'chart-bar', labelKey: 'tracker.history', visibilityKey: 'prayerHistory' },
] as const;

export const EMPTY_COUNTDOWN = '--:--:--';
