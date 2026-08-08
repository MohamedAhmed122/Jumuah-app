import { Tabs } from 'expo-router';

import { createTabScreenOptions } from './components/TabScreen.options';
import { TAB_SCREEN_OPTIONS } from './TabLayout.constants';
import { useTabLayout } from './hooks/TabLayout.hooks';

export default function TabLayout() {
  const tabs = useTabLayout();

  return (
    <Tabs screenOptions={TAB_SCREEN_OPTIONS}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.route}
          name={tab.route}
          options={createTabScreenOptions(tab)}
        />
      ))}
    </Tabs>
  );
}
