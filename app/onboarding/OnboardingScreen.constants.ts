export const ONBOARDING_STEPS = {
  welcome: 0,
  language: 1,
  theme: 2,
  location: 3,
  notifications: 4,
  mosque: 5,
  done: 6,
} as const;
export const TOTAL_STEPS = 7;
export const THEME_CHOICES = [
  { icon: 'white-balance-sunny', theme: 'light' },
  { icon: 'weather-night', theme: 'dark' },
] as const;
export const TRANSITION_DISTANCE = 80;
export const TRANSITION_DURATION = 480;
export const TRANSITION_FADE_DURATION = 360;
export const TRANSITION_START_SCALE = 0.94;
export const LOCATION_TIMEOUT_MS = 8000;
export const LAST_LOCATION_MAX_AGE_MS = 300000;
