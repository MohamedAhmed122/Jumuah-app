export interface PrayerLogRow {
  date: string;
  prayer: string;
  prayed: boolean;
}

export interface HeatmapDay {
  day: number;
  prayed: number;
  isFuture: boolean;
}

export interface WeeklyDay {
  label: string;
  prayed: number;
}

export interface StatsData {
  monthlyPct: number;
  streak: number;
  heatmap: HeatmapDay[];
  weekly: WeeklyDay[];
  firstWeekday: number;
}
