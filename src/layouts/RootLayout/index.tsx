import { RootNavigator } from './components/RootNavigator';
import { RootProviders } from './components/RootProviders';
import { useRootLayout } from './hooks/RootLayout.hooks';

export default function RootLayout() {
  const { hydrated } = useRootLayout();

  if (!hydrated) return null;

  return (
    <RootProviders>
      <RootNavigator />
    </RootProviders>
  );
}
