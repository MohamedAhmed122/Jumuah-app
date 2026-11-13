import { createThemedStyles } from '@src/theme';

import { getEventColors } from '../CalendarScreen.constants';

export const themedStyles = createThemedStyles((colors) => ({
  item: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  label: { color: colors.textSecondary, fontSize: 11 },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dot: { borderRadius: 4, height: 8, width: 8 },
}));

export const themedLegendDotStyles = createThemedStyles((colors) => {
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
