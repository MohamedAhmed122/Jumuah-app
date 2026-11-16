import { useEffect } from 'react';
import { DATA_REFRESH_MS, DATA_RETRY_MS } from '../TvPrayerScreen.constants';

export function useRefreshLoop(load: (isActive: () => boolean) => Promise<boolean>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const run = async () => {
      const succeeded = await load(() => active);
      if (active) timer = setTimeout(() => { void run(); }, succeeded ? DATA_REFRESH_MS : DATA_RETRY_MS);
    };
    void run();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [load, enabled]);
}
