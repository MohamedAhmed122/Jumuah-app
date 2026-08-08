import { PRAYER_NAMES } from '@constants/prayerMethods';

import type { QadaAdjustment, QadaCountMap } from './QadaScreen.types';

export function createEmptyQadaCounts(): QadaCountMap {
  return Object.fromEntries(PRAYER_NAMES.map((prayer) => [prayer, 0])) as QadaCountMap;
}

export function getAdjustedCount(current: number, delta: QadaAdjustment): number {
  return Math.max(0, current + delta);
}

export function getQadaTotal(counts: QadaCountMap): number {
  return Object.values(counts).reduce((total, count) => total + count, 0);
}
