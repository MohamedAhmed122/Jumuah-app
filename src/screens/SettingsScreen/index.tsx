import { RefreshControl, ScrollView, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { LanguageSettings } from './components/LanguageSettings';
import { LogoutButton } from './components/LogoutButton';
import { MosqueSettings } from './components/MosqueSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { PermissionBanners } from './components/PermissionBanners';
import { SettingsHeader } from './components/SettingsHeader';
import { useSettingsScreen } from './hooks/SettingsScreen.hooks';
import { createTopInset, styles } from './SettingsScreen.styles';

export default function SettingsScreen() {
  const { t, insets, permissions, mosque, actions } = useSettingsScreen();
  return (
    <View style={[styles.root, createTopInset(insets.top)]}>
      <SettingsHeader t={t} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={(
          <RefreshControl
            refreshing={mosque.refreshing}
            onRefresh={mosque.refresh}
            tintColor={Colors.accent}
            colors={[Colors.accent]}
          />
        )}
      >
        <PermissionBanners {...permissions} />
        <LanguageSettings selected={actions.appLanguage} onSelect={actions.selectLanguage} t={t} />
        <MosqueSettings mosques={mosque.mosques} selected={mosque.preferredMosqueId} error={mosque.error} onSelect={mosque.selectMosque} t={t} />
        <NotificationSettings
          toggles={actions.notificationToggles}
          kahfEnabled={actions.kahfReminderEnabled}
          onToggle={actions.togglePrayerNotification}
          onKahfChange={actions.setKahfReminder}
          t={t}
        />
        <LogoutButton onPress={actions.resetApplication} t={t} />
      </ScrollView>
    </View>
  );
}
