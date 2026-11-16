import { useCallback, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { createStageStyles } from '../TvPrayerScreen.styles';

export function useStageStyles() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize((current) => (current.width === width && current.height === height ? current : { width, height }));
  }, []);

  const styles = useMemo(() => createStageStyles(size.width, size.height), [size.width, size.height]);
  return { stage: styles.stage, onLayout, ready: size.width > 0 };
}
