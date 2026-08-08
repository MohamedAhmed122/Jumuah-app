import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import i18n from '@src/i18n';

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </I18nextProvider>
  );
}
