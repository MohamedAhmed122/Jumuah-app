import {
  FAJR_ISHA_ANGLE,
  HIGH_LATITUDE_ISHA_AFTER_MAGHRIB_MINUTES,
  SHORT_ASR_WINDOW_MINUTES,
  STANDARD_ASR_SHADOW_FACTOR,
  SUNRISE_SUNSET_ALTITUDE,
  TIMETABLE_SAFETY_MINUTES,
} from './calculator.constants';
import {
  getAsrAltitude,
  getHourAngleForAltitude,
  getJulianDay,
  getSolarNoonHour,
  getSunPosition,
} from './calculator.solar';
import { addMinutes, ceilToMinute, hourToDate } from './calculator.time';
import type { Coordinates, PrayerTimes } from './calculator.types';

export function calculatePrayerTimes(date: Date, coordinates: Coordinates): PrayerTimes {
  const { dec, eqTime } = getSunPosition(getJulianDay(date));
  const noon = getSolarNoonHour(date, coordinates, eqTime);
  const sunriseOffset = getHourAngleForAltitude(
    SUNRISE_SUNSET_ALTITUDE,
    coordinates.lat,
    dec,
  );
  const fajrOffset = getHourAngleForAltitude(-FAJR_ISHA_ANGLE, coordinates.lat, dec);
  const asrOffset = getHourAngleForAltitude(
    getAsrAltitude(STANDARD_ASR_SHADOW_FACTOR, coordinates.lat, dec),
    coordinates.lat,
    dec,
  );
  const dhuhr = ceilToMinute(addMinutes(hourToDate(date, noon), TIMETABLE_SAFETY_MINUTES));
  const sunrise = Number.isFinite(sunriseOffset)
    ? ceilToMinute(hourToDate(date, noon - sunriseOffset))
    : ceilToMinute(hourToDate(date, 6));
  const maghrib = Number.isFinite(sunriseOffset)
    ? ceilToMinute(addMinutes(hourToDate(date, noon + sunriseOffset), TIMETABLE_SAFETY_MINUTES))
    : ceilToMinute(hourToDate(date, 18));
  const asr = Number.isFinite(asrOffset)
    ? ceilToMinute(hourToDate(date, noon + asrOffset))
    : ceilToMinute(hourToDate(date, noon + 2));
  const highLatitudeFallback = !Number.isFinite(fajrOffset);
  const fajr = highLatitudeFallback
    ? ceilToMinute(hourToDate(date, noon - 12))
    : ceilToMinute(hourToDate(date, noon - fajrOffset));
  const isha = highLatitudeFallback
    ? ceilToMinute(addMinutes(maghrib, HIGH_LATITUDE_ISHA_AFTER_MAGHRIB_MINUTES))
    : ceilToMinute(hourToDate(date, noon + fajrOffset));
  const asrWindowMinutes = Math.max(
    0,
    Math.round((maghrib.getTime() - asr.getTime()) / 60000),
  );

  return {
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
    meta: {
      highLatitudeFallback,
      asrWindowMinutes,
      isAsrWindowShort: asrWindowMinutes > 0 && asrWindowMinutes < SHORT_ASR_WINDOW_MINUTES,
    },
  };
}
