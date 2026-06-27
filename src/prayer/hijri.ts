export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

const HIJRI_MONTH_NAMES_EN = [
  'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah',
];

const HIJRI_MONTH_NAMES_RU = [
  'Мухаррам', 'Сафар', 'Раби аль-Авваль', 'Раби ас-Сани',
  'Джумад аль-Уля', 'Джумад ас-Сани', 'Раджаб', 'Шаабан',
  'Рамадан', 'Шавваль', 'Зуль-Каада', 'Зуль-Хиджа',
];

export function toHijri(date: Date, lang: 'en' | 'ru' = 'en'): HijriDate {
  const jd = gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { year, month, day } = julianToHijri(jd);
  const names = lang === 'ru' ? HIJRI_MONTH_NAMES_RU : HIJRI_MONTH_NAMES_EN;
  return { year, month, day, monthName: names[month - 1] };
}

function gregorianToJulian(y: number, m: number, d: number): number {
  if (m <= 2) { y--; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524;
}

function julianToHijri(jd: number): { year: number; month: number; day: number } {
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

export function isRamadan(hijri: HijriDate) { return hijri.month === 9; }
export function isEidAlFitr(hijri: HijriDate) { return hijri.month === 10 && hijri.day === 1; }
export function isEidAlAdha(hijri: HijriDate) { return hijri.month === 12 && hijri.day === 10; }
export function isDayOfArafah(hijri: HijriDate) { return hijri.month === 12 && hijri.day === 9; }
export function isAshura(hijri: HijriDate) { return hijri.month === 1 && hijri.day === 10; }
export function isFirstTenDhulHijjah(hijri: HijriDate) { return hijri.month === 12 && hijri.day <= 10; }
