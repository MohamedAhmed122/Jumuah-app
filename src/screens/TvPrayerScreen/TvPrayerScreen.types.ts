import type { PrayerName } from '@constants/prayerMethods';
import type { PrayerTimes } from '@src/prayer/calculator';
import type { IqamaTimes } from '@src/prayer/mosqueTimes';
import type { TvAdhkarPosition } from './TvPrayerScreen.adhkar.types';

export type TvPrayerKey = PrayerName | 'sunrise' | 'jummah';
export type TvScreenMode = 'prayers' | 'announcements';
export type TvAlertPhase = 'adhan' | 'countdown' | 'iqama' | 'praying' | 'adhkar' | 'adhkarBreak';

export interface TvDay {
  date: Date;
  times: PrayerTimes;
  iqamaTimes: IqamaTimes;
  jummahTimes: Date[];
}

export interface TvAlertEvent {
  key: string;
  name: TvPrayerKey;
  adhan: Date;
  iqama: Date | null;
}

export interface TvPrayerCard {
  key: string;
  name: TvPrayerKey;
  primary: Date;
  primaryKind: 'adhan' | 'time';
  secondary: Date[];
  secondaryKind: 'iqama' | 'jummah' | null;
}

export interface TvAlertState {
  phase: TvAlertPhase;
  event: TvAlertEvent;
  remainingMs: number;
  totalMs: number;
  witnessed: boolean;
  adhkar: TvAdhkarPosition | null;
}

export interface TvCycleState {
  mode: TvScreenMode;
  prayersElapsedMs: number;
  slideIndex: number;
  slideElapsedMs: number;
  slideDurationMs: number;
}

export interface TvCycleInput {
  deltaMs: number;
  alertActive: boolean;
  menuOpen: boolean;
  enabled: boolean;
  count: number;
  slideSeconds: number;
}

export interface TvAnnouncementSlide {
  key: string;
  tag: string;
  title: string;
  body: string;
  details: string[];
}

export interface TvHeaderView {
  mosqueLine: string;
  dateLine: string;
  clock: string;
  seconds: string;
  offline: boolean;
}

export interface TvCardView {
  key: string;
  name: string;
  primaryLabel: string;
  primaryTime: string;
  secondaryLabel: string | null;
  secondaryTime: string;
  isNext: boolean;
  isPassed: boolean;
}

export interface TvNextView {
  name: string;
  adhanTime: string;
  countdown: string;
}

export interface TvAlertView {
  name: string;
  adhanTime: string;
  iqamaTime: string;
  countdown: string;
  percentRemaining: number;
  remainingMs: number;
}

export interface TvAnnouncementsView {
  slides: TvAnnouncementSlide[];
  index: number;
  progressPercent: number;
  counter: string;
}
