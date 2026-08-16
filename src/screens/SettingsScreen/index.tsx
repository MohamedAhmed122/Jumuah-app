import { RefreshControl, ScrollView, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { LanguageSettings } from './components/LanguageSettings';
import { LogoutButton } from './components/LogoutButton';
import { MosqueSettings } from './components/MosqueSettings';
import { CustomizeAppSettings } from './components/CustomizeAppSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { PermissionBanners } from './components/PermissionBanners';
import { SettingsHeader } from './components/SettingsHeader';
import { SettingsMenu } from './components/SettingsMenu';
import { SettingsModal } from './components/SettingsModal';
import { useSettingsScreen } from './hooks/SettingsScreen.hooks';
import { createTopInset, styles } from './SettingsScreen.styles';

export default function SettingsScreen() {
  const screen = useSettingsScreen();
  const { t, insets, permissions, mosque, actions } = screen;
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
        <SettingsMenu onNotifications={screen.openNotifications} onCustomize={screen.openCustomize} t={t} />
        <LogoutButton onPress={actions.resetApplication} t={t} />
      </ScrollView>
      <SettingsModal visible={screen.modal === 'notifications'} title={t('settings.notifications')} onClose={screen.closeModal}>
        <NotificationSettings toggles={actions.notificationToggles} kahfEnabled={actions.kahfReminderEnabled} onToggle={actions.togglePrayerNotification} onKahfChange={actions.setKahfReminder} t={t} />
      </SettingsModal>
      <SettingsModal visible={screen.modal === 'customize'} title={t('settings.customize_app')} onClose={screen.closeModal}>
        <CustomizeAppSettings values={actions.appVisibility} onChange={actions.setAppVisibility} t={t} />
      </SettingsModal>
    </View>
  );
}
