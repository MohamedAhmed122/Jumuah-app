import { MAX_TICK_DELTA_MS, PRAYER_SCREEN_DURATION_MS } from './TvPrayerScreen.constants';
import type { TvCycleInput, TvCycleState } from './TvPrayerScreen.types';

export const INITIAL_CYCLE: TvCycleState = {
  mode: 'prayers',
  prayersElapsedMs: 0,
  slideIndex: 0,
  slideElapsedMs: 0,
  slideDurationMs: 0,
};

export function advanceCycle(state: TvCycleState, input: TvCycleInput): TvCycleState {
  const deltaMs = Math.min(Math.max(input.deltaMs, 0), MAX_TICK_DELTA_MS);
  if (input.alertActive || !input.enabled || input.count === 0) return INITIAL_CYCLE;

  if (state.mode === 'prayers') {
    if (input.menuOpen) return state;
    const prayersElapsedMs = state.prayersElapsedMs + deltaMs;
    if (prayersElapsedMs < PRAYER_SCREEN_DURATION_MS) return { ...state, prayersElapsedMs };
    return { ...INITIAL_CYCLE, mode: 'announcements', slideDurationMs: input.slideSeconds * 1000 };
  }

  if (state.slideIndex >= input.count) return INITIAL_CYCLE;
  const slideElapsedMs = state.slideElapsedMs + deltaMs;
  if (slideElapsedMs < state.slideDurationMs) return { ...state, slideElapsedMs };
  const slideIndex = state.slideIndex + 1;
  if (slideIndex >= input.count) return INITIAL_CYCLE;
  return { ...state, slideIndex, slideElapsedMs: 0, slideDurationMs: input.slideSeconds * 1000 };
}
