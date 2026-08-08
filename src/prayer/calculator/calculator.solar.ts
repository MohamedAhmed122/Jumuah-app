import { normalizeAngle, normalizeHour, toDegrees, toRadians } from './calculator.math';
import type { Coordinates, SolarPosition } from './calculator.types';

export function getJulianDay(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const adjustment = Math.floor((14 - month) / 12);
  const adjustedYear = year + 4800 - adjustment;
  const adjustedMonth = month + 12 * adjustment - 3;

  return day + Math.floor((153 * adjustedMonth + 2) / 5) + 365 * adjustedYear
    + Math.floor(adjustedYear / 4) - Math.floor(adjustedYear / 100)
    + Math.floor(adjustedYear / 400) - 32045;
}

export function getSunPosition(julianDay: number): SolarPosition {
  const days = julianDay - 2451545.0;
  const anomaly = normalizeAngle(357.529 + 0.98560028 * days);
  const longitude = normalizeAngle(280.459 + 0.98564736 * days);
  const eclipticLongitude = normalizeAngle(
    longitude + 1.915 * Math.sin(toRadians(anomaly)) + 0.02 * Math.sin(toRadians(2 * anomaly)),
  );
  const obliquity = 23.439 - 0.00000036 * days;
  const rightAscension = toDegrees(Math.atan2(
    Math.cos(toRadians(obliquity)) * Math.sin(toRadians(eclipticLongitude)),
    Math.cos(toRadians(eclipticLongitude)),
  )) / 15;
  const dec = toDegrees(Math.asin(
    Math.sin(toRadians(obliquity)) * Math.sin(toRadians(eclipticLongitude)),
  ));

  return { dec, eqTime: longitude / 15 - normalizeHour(rightAscension) };
}

export function getSolarNoonHour(date: Date, coordinates: Coordinates, equationOfTime: number) {
  const timezone = -date.getTimezoneOffset() / 60;
  return 12 + timezone - coordinates.lng / 15 - equationOfTime;
}

export function getHourAngleForAltitude(altitude: number, latitude: number, declination: number) {
  const cosine = (
    Math.sin(toRadians(altitude)) - Math.sin(toRadians(latitude)) * Math.sin(toRadians(declination))
  ) / (Math.cos(toRadians(latitude)) * Math.cos(toRadians(declination)));
  if (cosine < -1 || cosine > 1) return NaN;
  return toDegrees(Math.acos(cosine)) / 15;
}

export function getAsrAltitude(shadowFactor: number, latitude: number, declination: number) {
  return toDegrees(Math.atan(
    1 / (shadowFactor + Math.tan(toRadians(Math.abs(latitude - declination)))),
  ));
}
