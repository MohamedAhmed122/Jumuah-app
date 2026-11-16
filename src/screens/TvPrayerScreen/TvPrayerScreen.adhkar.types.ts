export type TvAdhkarKind = 'text' | 'tasbih' | 'ayah';

export interface TvAdhkarItem {
  key: string;
  kind: TvAdhkarKind;
  durationMs: number;
  tag: string;
  repeat: boolean;
  arabic: string;
  translation: string;
}

export interface TvTasbihItem {
  key: string;
  arabic: string;
  transliteration: string;
  count: string;
}

export interface TvAdhkarPosition {
  round: number;
  index: number;
  elapsedMs: number;
  durationMs: number;
}

export interface TvAdhkarView {
  prayerName: string;
  roundLabel: string;
  item: TvAdhkarItem;
  index: number;
  count: number;
  progressPercent: number;
  counter: string;
}

export interface TvPrayingView {
  prayerName: string;
  countdown: string;
  percentElapsed: number;
}

export interface TvAdhkarBreakView {
  roundLabel: string;
  secondsLeft: string;
  remainingMs: number;
}
