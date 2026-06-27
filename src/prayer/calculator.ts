interface Coords { lat: number; lng: number }

export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  meta: {
    highLatitudeFallback: boolean;
    asrWindowMinutes: number;
    isAsrWindowShort: boolean;
  };
}

const FAJR_ISHA_ANGLE = 18;
const SUNRISE_SUNSET_ALTITUDE = -0.833;
const STANDARD_ASR_SHADOW_FACTOR = 1;
const SHORT_ASR_WINDOW_MINUTES = 45;
const TIMETABLE_SAFETY_MINUTES = 4;
const HIGH_LATITUDE_ISHA_AFTER_MAGHRIB_MINUTES = 75;

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function toDeg(rad: number) { return (rad * 180) / Math.PI; }
function fixAngle(a: number) { return a - 360 * Math.floor(a / 360); }
function fixHour(h: number) { return h - 24 * Math.floor(h / 24); }

function julianDay(date: Date) {
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const A = Math.floor((14 - M) / 12);
  const y = Y + 4800 - A;
  const m = M + 12 * A - 3;
  return D + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * Math.sin(toRad(g)) + 0.02 * Math.sin(toRad(2 * g)));
  const e = 23.439 - 0.00000036 * D;
  const RA = toDeg(Math.atan2(Math.cos(toRad(e)) * Math.sin(toRad(L)), Math.cos(toRad(L)))) / 15;
  const dec = toDeg(Math.asin(Math.sin(toRad(e)) * Math.sin(toRad(L))));
  const eqTime = q / 15 - fixHour(RA);
  return { dec, eqTime };
}

function solarNoonHour(date: Date, coords: Coords, eqTime: number) {
  const timezone = -date.getTimezoneOffset() / 60;
  return 12 + timezone - coords.lng / 15 - eqTime;
}

function hourAngleForAltitude(altitude: number, lat: number, dec: number) {
  const cosH = (Math.sin(toRad(altitude)) - Math.sin(toRad(lat)) * Math.sin(toRad(dec))) /
    (Math.cos(toRad(lat)) * Math.cos(toRad(dec)));
  if (cosH < -1 || cosH > 1) return NaN;
  return toDeg(Math.acos(cosH)) / 15;
}

function asrAltitude(shadowFactor: number, lat: number, dec: number) {
  return toDeg(Math.atan(1 / (shadowFactor + Math.tan(toRad(Math.abs(lat - dec))))));
}

function hourToDate(baseDate: Date, fractionalHour: number): Date {
  const h = fixHour(fractionalHour);
  const hours = Math.floor(h);
  const minutes = Math.floor((h - hours) * 60);
  const seconds = Math.round((((h - hours) * 60) - minutes) * 60);
  const d = new Date(baseDate);
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function ceilToMinute(date: Date) {
  const d = new Date(date);
  if (d.getSeconds() > 0 || d.getMilliseconds() > 0) {
    d.setMinutes(d.getMinutes() + 1);
  }
  d.setSeconds(0, 0);
  return d;
}

export function calculatePrayerTimes(date: Date, coords: Coords): PrayerTimes {
  const { dec, eqTime } = sunPosition(julianDay(date));
  const noon = solarNoonHour(date, coords, eqTime);

  const sunriseOffset = hourAngleForAltitude(SUNRISE_SUNSET_ALTITUDE, coords.lat, dec);
  const fajrOffset = hourAngleForAltitude(-FAJR_ISHA_ANGLE, coords.lat, dec);
  const asrOffset = hourAngleForAltitude(
    asrAltitude(STANDARD_ASR_SHADOW_FACTOR, coords.lat, dec),
    coords.lat,
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

  let highLatitudeFallback = false;
  let fajr: Date;
  let isha: Date;

  if (Number.isFinite(fajrOffset)) {
    fajr = ceilToMinute(hourToDate(date, noon - fajrOffset));
    isha = ceilToMinute(hourToDate(date, noon + fajrOffset));
  } else {
    highLatitudeFallback = true;
    fajr = ceilToMinute(hourToDate(date, noon - 12));
    isha = ceilToMinute(addMinutes(maghrib, HIGH_LATITUDE_ISHA_AFTER_MAGHRIB_MINUTES));
  }

  const asrWindowMinutes = Math.max(0, Math.round((maghrib.getTime() - asr.getTime()) / 60000));

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
