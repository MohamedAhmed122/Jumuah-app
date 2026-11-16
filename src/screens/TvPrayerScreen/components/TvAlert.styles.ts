import { createThemedStyles } from '@src/theme';

const circle = { alignItems: 'center', borderRadius: 100, height: 200, justifyContent: 'center', width: 200 } as const;
const ring = { borderRadius: 130, borderWidth: 8, height: 260, left: 0, position: 'absolute', top: 0, width: 260 } as const;
const screen = { alignItems: 'center', flex: 1, gap: 20, justifyContent: 'center' } as const;
const track = { bottom: 0, height: 16, left: 0, position: 'absolute', right: 0 } as const;

export const themedStyles = createThemedStyles((colors) => ({
  adhanCircle: { ...circle, backgroundColor: colors.onAccent },
  adhanFill: { backgroundColor: colors.onAccent, height: 16 },
  adhanRing: { ...ring, borderColor: colors.onAccent },
  adhanScreen: { ...screen, backgroundColor: colors.accent },
  adhanText: { color: colors.onAccent },
  adhanTrack: { ...track, backgroundColor: 'rgba(0,0,0,0.15)' },
  arabic: { fontSize: 150, fontWeight: '700', lineHeight: 190 },
  detail: { fontSize: 60, fontVariant: ['tabular-nums'], fontWeight: '500' },
  headline: { fontSize: 96, fontWeight: '900', lineHeight: 104 },
  iqamaArabic: { color: colors.inverseAlertAccent },
  iqamaCircle: { ...circle, backgroundColor: colors.inverseAlertAccent },
  iqamaFill: { backgroundColor: colors.inverseAlertAccent, height: 16 },
  iqamaRing: { ...ring, borderColor: colors.inverseAlertAccent },
  iqamaScreen: { ...screen, backgroundColor: colors.inverseAlertBackground, gap: 18 },
  iqamaText: { color: colors.inverseAlertText },
  iqamaTrack: { ...track, backgroundColor: 'rgba(127,127,127,0.25)' },
  pulse: { alignItems: 'center', height: 260, justifyContent: 'center', marginBottom: 24, width: 260 },
  silence: { alignItems: 'center', flexDirection: 'row', gap: 16, marginTop: 20 },
  silenceText: { fontSize: 40, fontWeight: '500' },
  stand: { fontSize: 52, fontWeight: '500' },
}));
