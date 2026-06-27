import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addMonths, subMonths, startOfMonth, getDaysInMonth, getDay } from 'date-fns';

import { Colors } from '@constants/Colors';
import {
  toHijri, isRamadan, isEidAlFitr, isEidAlAdha,
  isDayOfArafah, isAshura, isFirstTenDhulHijjah,
} from '@src/prayer/hijri';
import { useSettingsStore } from '@src/stores/settingsStore';

interface DayCell {
  date: Date;
  day: number;
  hijriDay: number;
  hijriMonth: number;
  events: string[];
}

function buildCells(monthStart: Date, lang: 'en' | 'ru'): (DayCell | null)[] {
  const days = getDaysInMonth(monthStart);
  const firstWeekday = (getDay(startOfMonth(monthStart)) + 6) % 7; // Mon-first

  const cells: (DayCell | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= days; d++) {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), d);
    const hijri = toHijri(date, lang);
    const events: string[] = [];
    if (isRamadan(hijri)) events.push('ramadan');
    if (isEidAlFitr(hijri)) events.push('eid_fitr');
    if (isEidAlAdha(hijri)) events.push('eid_adha');
    if (isDayOfArafah(hijri)) events.push('arafah');
    if (isAshura(hijri)) events.push('ashura');
    if (isFirstTenDhulHijjah(hijri) && !isEidAlAdha(hijri)) events.push('dhul_hijjah');
    cells.push({ date, day: d, hijriDay: hijri.day, hijriMonth: hijri.month, events });
  }
  return cells;
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const EVENT_COLORS: Record<string, string> = {
  ramadan: Colors.accent,
  eid_fitr: Colors.accentSoft,
  eid_adha: Colors.accentSoft,
  arafah: Colors.accentSoft,
  ashura: Colors.accentSoft,
  dhul_hijjah: Colors.textSecondary,
};

export default function CalendarScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { appLanguage } = useSettingsStore();

  const today = new Date();
  const [monthStart, setMonthStart] = useState(startOfMonth(today));
  const cells = buildCells(monthStart, appLanguage);
  const currentHijri = toHijri(monthStart, appLanguage);

  const gregMonthName = monthStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>{t('calendar.title')}</Text>

      {/* Month nav */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => setMonthStart(subMonths(monthStart, 1))} hitSlop={12}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.monthLabels}>
          <Text style={styles.monthGreg}>{gregMonthName}</Text>
          <Text style={styles.monthHijri}>{currentHijri.monthName} {currentHijri.year}</Text>
        </View>
        <TouchableOpacity onPress={() => setMonthStart(addMonths(monthStart, 1))} hitSlop={12}>
          <MaterialCommunityIcons name="chevron-right" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={i} style={[styles.weekday, i === 4 && styles.weekdayFri]}>{w}</Text>
        ))}
      </View>

      {/* Calendar grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {cells.map((cell, i) => {
          if (!cell) return <View key={`empty-${i}`} style={styles.cell} />;

          const isToday = cell.date.toDateString() === today.toDateString();
          const isRam = cell.events.includes('ramadan');
          const hasEvent = cell.events.length > 0 && !isRam;
          const eventColor = cell.events[0] ? EVENT_COLORS[cell.events[0]] : undefined;

          return (
            <View key={i} style={[styles.cell, isRam && styles.cellRamadan]}>
              <View style={[styles.dayCircle, isToday && styles.dayCircleToday]}>
                <Text style={[styles.dayNum, isToday && styles.dayNumToday]}>{cell.day}</Text>
              </View>
              <Text style={styles.hijriNum}>{cell.hijriDay}</Text>
              {hasEvent && <View style={[styles.eventDot, { backgroundColor: eventColor }]} />}
            </View>
          );
        })}
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        {(['ramadan', 'eid_fitr', 'arafah', 'ashura'] as const).map((k) => (
          <View key={k} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: EVENT_COLORS[k] }]} />
            <Text style={styles.legendLabel}>{t(`calendar.${k}`)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  backBtn: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, paddingHorizontal: 20, marginBottom: 16 },

  monthNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, marginBottom: 14,
  },
  monthLabels: { alignItems: 'center' },
  monthGreg: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  monthHijri: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },

  weekdayRow: {
    flexDirection: 'row', paddingHorizontal: 10, marginBottom: 6,
  },
  weekday: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  weekdayFri: { color: Colors.accent },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingBottom: 12 },
  cell: { width: '14.28%', alignItems: 'center', paddingVertical: 4, minHeight: 56 },
  cellRamadan: { backgroundColor: 'rgba(61, 214, 140, 0.06)', borderRadius: 8 },

  dayCircle: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  dayCircleToday: { backgroundColor: Colors.accent },
  dayNum: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  dayNumToday: { color: Colors.background, fontWeight: '700' },
  hijriNum: { fontSize: 10, color: Colors.textSecondary, marginTop: 1 },
  eventDot: { width: 5, height: 5, borderRadius: 3, marginTop: 2 },

  legend: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 11, color: Colors.textSecondary },
});
