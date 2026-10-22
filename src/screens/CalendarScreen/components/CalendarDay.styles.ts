import { createThemedStyles } from '@src/theme';

import { getEventColors } from '../CalendarScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  cell: { alignItems: 'center', minHeight: 56, paddingVertical: 4, width: '14.28%' },
  cellRamadan: { backgroundColor: colors.accentTint, borderRadius: 8 },
  dayCircle: { alignItems: 'center', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  dayCircleToday: { backgroundColor: colors.accent },
  dayNumber: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  dayNumberToday: { color: colors.onAccent, fontWeight: '700' },
  eventDot: { borderRadius: 3, height: 5, marginTop: 2, width: 5 },
  hijriNumber: { color: colors.textSecondary, fontSize: 10, marginTop: 1 },
}));

export const themedEventDotStyles = createThemedStyles((colors) => {
  const eventColors = getEventColors(colors);
  return {
    arafah: { backgroundColor: eventColors.arafah },
    ashura: { backgroundColor: eventColors.ashura },
    dhul_hijjah: { backgroundColor: eventColors.dhul_hijjah },
    eid_adha: { backgroundColor: eventColors.eid_adha },
    eid_fitr: { backgroundColor: eventColors.eid_fitr },
    ramadan: { backgroundColor: eventColors.ramadan },
  };
});
