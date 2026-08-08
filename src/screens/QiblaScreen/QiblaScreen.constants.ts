export const COMPASS_SIZE = 280;
export const ROSE_SIZE = COMPASS_SIZE;
export const NEEDLE_LENGTH = COMPASS_SIZE * 0.38;
export const SENSOR_UPDATE_INTERVAL = 100;
export const ROTATION_DURATION = 80;

export const CARDINALS = ['N', 'E', 'S', 'W'] as const;
export const COMPASS_TICKS = Array.from({ length: 72 }, (_, index) => index);
