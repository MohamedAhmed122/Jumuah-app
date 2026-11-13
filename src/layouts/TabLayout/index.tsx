import { Tabs } from 'expo-router';

import { createTabScreenOptions } from './components/TabScreen.options';
import { HIDDEN_TAB_OPTIONS } from './TabLayout.constants';
import { useTabLayout } from './hooks/TabLayout.hooks';

export default function TabLayout() {
  const { screenOptions, tabs } = useTabLayout();
  const [prayerTab, mapTab, communityTab, settingsTab] = tabs;

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
