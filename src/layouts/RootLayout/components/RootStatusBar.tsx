import { StatusBar } from 'expo-status-bar';

import { useThemeName } from '@src/hooks/useTheme';

export function RootStatusBar() {
  const theme = useThemeName();
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}
