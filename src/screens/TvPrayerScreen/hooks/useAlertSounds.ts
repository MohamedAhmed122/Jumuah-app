import { useEffect, useRef } from 'react';
import { useAudioPlayer } from 'expo-audio';
import { ADHAN_SOUND, IQAMA_SOUND } from '../TvPrayerScreen.sounds';
import type { TvAlertState } from '../TvPrayerScreen.types';

export function useAlertSounds(alert: TvAlertState | null) {
  const adhanPlayer = useAudioPlayer(ADHAN_SOUND);
  const iqamaPlayer = useAudioPlayer(IQAMA_SOUND);
  const played = useRef(new Set<string>());
  const phase = alert?.phase ?? null;
  const eventKey = alert?.event.key ?? null;
  const witnessed = alert?.witnessed ?? false;

  useEffect(() => {
    if (!phase || !eventKey || !witnessed || phase === 'countdown') return;
    const key = `${phase}:${eventKey}`;
    if (played.current.has(key)) return;
    played.current.add(key);
    const player = phase === 'adhan' ? adhanPlayer : iqamaPlayer;
    player.seekTo(0).then(() => player.play()).catch(() => undefined);
  }, [phase, eventKey, witnessed, adhanPlayer, iqamaPlayer]);
}
