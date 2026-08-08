export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SolarPosition {
  dec: number;
  eqTime: number;
}

export interface PrayerTimes {
  asr: Date;
  dhuhr: Date;
  fajr: Date;
  isha: Date;
  maghrib: Date;
  meta: {
    asrWindowMinutes: number;
    highLatitudeFallback: boolean;
    isAsrWindowShort: boolean;
  };
  sunrise: Date;
}
