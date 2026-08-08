import { useState } from 'react';

export function usePrayerWarnings() {
  const [showHighLatitude, setShowHighLatitude] = useState(true);
  const [showShortAsr, setShowShortAsr] = useState(true);
  return {
    showHighLatitude,
    showShortAsr,
    dismissHighLatitude: () => setShowHighLatitude(false),
    dismissShortAsr: () => setShowShortAsr(false),
  };
}
