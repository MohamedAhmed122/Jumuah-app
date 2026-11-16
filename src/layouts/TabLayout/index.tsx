import { Redirect, Tabs } from 'expo-router';

import { isTelevision } from '@src/device/television';

import { createTabScreenOptions } from './components/TabScreen.options';
import { HIDDEN_TAB_OPTIONS } from './TabLayout.constants';
import { useTabLayout } from './hooks/TabLayout.hooks';

export default function TabLayout() {
  const { screenOptions, tabs } = useTabLayout();
  const [prayerTab, mapTab, communityTab, settingsTab] = tabs;

  if (isTelevision) return <Redirect href="/tv" />;

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="index" options={createTabScreenOptions(prayerTab)} />
      <Tabs.Screen name="map/index" options={createTabScreenOptions(mapTab)} />
      <Tabs.Screen
        name="community"
        options={createTabScreenOptions(communityTab)}
      />
      <Tabs.Screen
        name="settings"
        options={createTabScreenOptions(settingsTab)}
      />
      <Tabs.Screen name="quiz" options={HIDDEN_TAB_OPTIONS} />
    </Tabs>
  );
}
