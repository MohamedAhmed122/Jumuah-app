import type { PrayerName } from "@constants/prayerMethods";
import type { AppLanguage } from "@src/i18n/languages";

export interface Mosque {
  address: string;
  city: string;
  hours?: string;
  id: string;
  image?: string;
  iqamaOffsets?: Partial<Record<PrayerName, number>>;
  iqamaTimes?: Partial<Record<PrayerName, string>>;
  jummahSchedule?: {
    allFridays: boolean;
    endDate?: string;
    startDate?: string;
    times: string[];
  };
  jumuahTimes?: { first?: string; second?: string };
  lat: number;
  lng: number;
  name: string;
  phone?: string;
}

export interface MosquePrayerTime {
  date: string;
  id: string;
  mosqueId: string;
  times: {
    asr: string;
    dhuhr: string;
    fajr: string;
    isha: string;
    maghrib: string;
  };
}

export interface HalalPlace {
  address: string;
  averageMealCost?: number;
  category: "restaurant" | "grocery" | "fast_food" | "supermarket_halal";
  city: string;
  country: string;
  descriptionHtml: string;
  discountPercent?: number;
  foodCategories?: string[];
  hours?: string;
  id: string;
  image: string;
  lat: number;
  lng: number;
  name: string;
  phone?: string;
  promoCode?: string;
}

export interface LocationBundle {
  halal: HalalPlace[];
  mosques: Mosque[];
}

export interface CachedLocationBundle {
  bundle: LocationBundle;
  language: AppLanguage;
  version: number;
}
