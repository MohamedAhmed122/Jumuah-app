import type { TvAdhkarItem, TvTasbihItem } from './TvPrayerScreen.adhkar.types';

export const ADHKAR_ROUNDS = 2;
export const ADHKAR_BREAK_MS = 5000;
export const PRAYER_DURATION_MS = 8 * 60 * 1000;
export const ISHA_PRAYER_DURATION_MS = 12 * 60 * 1000;

export const ADHKAR_ITEMS: TvAdhkarItem[] = [
  {
    key: 'istighfar',
    kind: 'text',
    durationMs: 4000,
    tag: 'Istighfar',
    repeat: true,
    arabic: 'أَسْتَغْفِرُ اللهَ',
    translation: 'I seek the forgiveness of Allah.',
  },
  {
    key: 'as-salam',
    kind: 'text',
    durationMs: 8000,
    tag: 'As-Salam',
    repeat: false,
    arabic: 'اَللّٰهُمَّ أَنْتَ السَّلَامُ ، وَمِنْكَ السَّلَامُ ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    translation: 'O Allah, You are The Flawless and The Source of Peace, and from You comes peace. Blessed are You, full of Majesty and Honour.',
  },
  {
    key: 'tahlil',
    kind: 'text',
    durationMs: 15000,
    tag: 'Tahlil',
    repeat: false,
    arabic: 'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اَللّٰهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    translation: 'There is no god worthy of worship except Allah alone, without partner. To Him belongs the dominion, and to Him belongs all praise, and He has power over all things. O Allah, none can withhold what You have given, and none can give what You have withheld, and no wealth or fortune will benefit its owner against You.',
  },
  {
    key: 'dua',
    kind: 'text',
    durationMs: 5000,
    tag: 'Dua',
    repeat: false,
    arabic: 'اَللّٰهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    translation: 'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.',
  },
  {
    key: 'tasbih',
    kind: 'tasbih',
    durationMs: 100000,
    tag: 'Tasbih',
    repeat: false,
    arabic: 'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translation: 'There is no god worthy of worship except Allah alone, without partner. To Him belongs the dominion, and to Him belongs all praise, and He has power over all things.',
  },
  {
    key: 'ayat-al-kursi',
    kind: 'ayah',
    durationMs: 35000,
    tag: 'Ayat al-Kursi · Al-Baqarah 2:255',
    repeat: false,
    arabic: 'اللهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    translation: '',
  },
];

export const TASBIH_ITEMS: TvTasbihItem[] = [
  { key: 'subhanallah', arabic: 'سُبْحَانَ اللهِ', transliteration: 'Subhanallah', count: '× 33' },
  { key: 'alhamdulillah', arabic: 'الْحَمْدُ لِلهِ', transliteration: 'Alhamdulillah', count: '× 33' },
  { key: 'allahu-akbar', arabic: 'اللهُ أَكْبَرُ', transliteration: 'Allahu Akbar', count: '× 33–34' },
];

export const ADHKAR_ROUND_MS = ADHKAR_ITEMS.reduce((total, item) => total + item.durationMs, 0);
export const ADHKAR_TOTAL_MS = ADHKAR_ROUND_MS * ADHKAR_ROUNDS + ADHKAR_BREAK_MS * (ADHKAR_ROUNDS - 1);
