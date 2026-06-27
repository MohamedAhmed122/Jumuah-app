import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

import { Colors } from '@constants/Colors';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { useSettingsStore } from '@src/stores/settingsStore';
import { PermissionBanner } from '@components/PermissionBanner';
import i18n from '@src/i18n';
import { clearUserDatabaseData } from '@src/db/userData';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    appLanguage, preferredMosqueId, notificationToggles, kahfReminderEnabled,
    setLanguage, setPreferredMosque, togglePrayerNotification, setKahfReminder,
    resetLocalSettings,
  } = useSettingsStore();

  const [locationDenied, setLocationDenied] = useState(false);
  const [notifDenied, setNotifDenied] = useState(false);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [mosquesError, setMosquesError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadMosques = async (forceRefresh = false) => {
    try {
      const bundle = await fetchLocationBundle(forceRefresh);
      setMosques(bundle.mosques);
      setMosquesError(false);
    } catch {
      setMosquesError(true);
    }
  };

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => setLocationDenied(status === 'denied'));
    Notifications.getPermissionsAsync().then(({ status }) => setNotifDenied(status === 'denied'));
    loadMosques();
  }, []);

  const handleLanguage = async (lang: 'en' | 'ru') => {
    await setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await clearUserDatabaseData();
    await resetLocalSettings();
    await i18n.changeLanguage('en');
    router.replace('/onboarding');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMosques(true);
    setRefreshing(false);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Text style={styles.title}>{t('settings.title')}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.accent}
            colors={[Colors.accent]}
          />
        }
      >

        {/* Permission banners */}
        {locationDenied && <PermissionBanner type="location" />}
        {notifDenied && <PermissionBanner type="notification" />}

        {/* Language */}
        <Section label={t('settings.language')}>
          <View style={styles.langRow}>
            {(['en', 'ru'] as const).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langBtn, appLanguage === lang && styles.langBtnActive]}
                onPress={() => handleLanguage(lang)}
              >
                <Text style={[styles.langBtnText, appLanguage === lang && styles.langBtnTextActive]}>
                  {lang === 'en' ? '🇬🇧 English' : '🇷🇺 Русский'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {/* Preferred mosque */}
        <Section label={t('settings.preferred_mosque')}>
          {mosquesError && (
            <View style={styles.noticeRow}>
              <Text style={styles.noticeText}>{t('errors.api_failed')}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.optionRow, preferredMosqueId === null && styles.optionRowActive]}
            onPress={() => setPreferredMosque(null)}
          >
            <Text style={[styles.optionLabel, preferredMosqueId === null && styles.optionLabelActive]}>
              {t('settings.use_local_calculation')}
            </Text>
            {preferredMosqueId === null && (
              <MaterialCommunityIcons name="check" size={18} color={Colors.accent} />
            )}
          </TouchableOpacity>
          {mosques.map((mosque) => (
            <TouchableOpacity
              key={mosque.id}
              style={[styles.optionRow, preferredMosqueId === mosque.id && styles.optionRowActive]}
              onPress={() => setPreferredMosque(mosque.id)}
            >
              <View style={styles.optionText}>
                <Text style={[styles.optionLabel, preferredMosqueId === mosque.id && styles.optionLabelActive]}>
                  {mosque.name}
                </Text>
                <Text style={styles.optionSub}>{mosque.address}</Text>
              </View>
              {preferredMosqueId === mosque.id && (
                <MaterialCommunityIcons name="check" size={18} color={Colors.accent} />
              )}
            </TouchableOpacity>
          ))}
        </Section>

        {/* Notification toggles */}
        <Section label={t('settings.notifications')}>
          <View style={styles.toggleHeaderRow}>
            <Text style={styles.toggleHeaderLeft} />
            <Text style={styles.toggleHeaderRight}>{t('prayer.toggle_adhan')}</Text>
            <Text style={styles.toggleHeaderRight}>{t('prayer.toggle_reminder')}</Text>
          </View>
          {PRAYER_NAMES.map((prayer) => (
            <View key={prayer} style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t(`prayer.${prayer}`)}</Text>
              <Switch
                value={notificationToggles[prayer]?.adhan ?? true}
                onValueChange={() => togglePrayerNotification(prayer, 'adhan')}
                trackColor={{ false: Colors.border, true: Colors.accent }}
                thumbColor={Colors.textPrimary}
              />
              <Switch
                value={notificationToggles[prayer]?.reminder ?? true}
                onValueChange={() => togglePrayerNotification(prayer, 'reminder')}
                trackColor={{ false: Colors.border, true: Colors.accentSoft }}
                thumbColor={Colors.textPrimary}
              />
            </View>
          ))}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{t('settings.kahf_reminder')}</Text>
            <Switch
              value={kahfReminderEnabled}
              onValueChange={setKahfReminder}
              trackColor={{ false: Colors.border, true: Colors.accent }}
              thumbColor={Colors.textPrimary}
            />
          </View>
        </Section>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <MaterialCommunityIcons name="logout" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={sStyles.section}>
      <Text style={sStyles.sectionLabel}>{label}</Text>
      <View style={sStyles.sectionBody}>{children}</View>
    </View>
  );
}

const sStyles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  sectionBody: { backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 26, fontWeight: '700', color: Colors.textPrimary, paddingHorizontal: 20, paddingBottom: 16, paddingTop: 8 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  langRow: { flexDirection: 'row', gap: 10, padding: 12 },
  langBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5,
    borderColor: Colors.border, alignItems: 'center',
  },
  langBtnActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  langBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  langBtnTextActive: { color: Colors.textPrimary },

  noticeRow: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  noticeText: { color: Colors.error, fontSize: 13 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  optionRowActive: { backgroundColor: 'rgba(61,214,140,0.07)' },
  optionText: { flex: 1 },
  optionLabel: { fontSize: 15, color: Colors.textSecondary },
  optionLabelActive: { color: Colors.textPrimary, fontWeight: '600' },
  optionSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, opacity: 0.75 },

  toggleHeaderRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  toggleHeaderLeft: { flex: 1 },
  toggleHeaderRight: { width: 70, textAlign: 'center', fontSize: 11, color: Colors.textSecondary },

  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  toggleLabel: { flex: 1, fontSize: 15, color: Colors.textPrimary },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.error,
    paddingVertical: 14,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
});
