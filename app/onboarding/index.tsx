import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@constants/Colors';
import { PRAYER_NAMES } from '@constants/prayerMethods';
import { useSettingsStore } from '@src/stores/settingsStore';
import { usePermissions } from '@src/hooks/usePermissions';
import i18n from '@src/i18n';
import { calculatePrayerTimes } from '@src/prayer/calculator';
import { DEFAULT_COORDS } from '@constants/prayerMethods';
import { fetchLocationBundle, type Mosque } from '@src/api/locations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_STEPS = 6;

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { setLanguage, setCoordinates, setPreferredMosque, completeOnboarding, userCoordinates, preferredMosqueId } = useSettingsStore();
  const { requestLocation, requestNotifications } = usePermissions();

  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ru'>('en');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [mosquesLoading, setMosquesLoading] = useState(false);
  const [mosquesError, setMosquesError] = useState(false);
  const [nextPrayerLabel, setNextPrayerLabel] = useState('');
  const [nextPrayerTime, setNextPrayerTime] = useState('');

  const translateX = useSharedValue(0);
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  const goTo = (next: number) => {
    const direction = next > step ? -SCREEN_WIDTH : SCREEN_WIDTH;
    translateX.value = direction;
    setStep(next);
    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  };

  const handleLanguage = async (lang: 'en' | 'ru') => {
    setSelectedLang(lang);
    await setLanguage(lang);
    await i18n.changeLanguage(lang);
  };

  const handleLocationStep = async (allow: boolean) => {
    if (allow) {
      const granted = await requestLocation();
      if (granted) {
        const Location = await import('expo-location');
        const pos = await Location.getCurrentPositionAsync({});
        await setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      } else {
        await setCoordinates(DEFAULT_COORDS);
      }
    } else {
      await setCoordinates(DEFAULT_COORDS);
    }
    goTo(3);
  };

  const handleNotificationStep = async (allow: boolean) => {
    if (allow) await requestNotifications();
    await loadMosques();
    goTo(4);
  };

  const loadMosques = async () => {
    try {
      setMosquesError(false);
      setMosquesLoading(true);
      const bundle = await fetchLocationBundle();
      setMosques(bundle.mosques);
    } catch {
      setMosquesError(true);
    } finally {
      setMosquesLoading(false);
    }
  };

  const handleFinish = () => {
    goTo(5);

    // Compute next prayer teaser for done screen
    const times = calculatePrayerTimes(
      new Date(),
      userCoordinates
    );
    const now = new Date();
    const upcoming = PRAYER_NAMES.find((p) => times[p as keyof typeof times] > now);
    if (upcoming) {
      setNextPrayerLabel(t(`prayer.${upcoming}`));
      const d = times[upcoming as keyof typeof times] as Date;
      setNextPrayerTime(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }

    checkScale.value = 0;
    checkOpacity.value = 0;
    checkScale.value = withSpring(1, { damping: 12 });
    checkOpacity.value = withTiming(1, { duration: 400 });
  };

  const handleEnterApp = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.pager, animStyle]}>
        {step === 0 && <WelcomeStep onNext={handleNext} t={t} />}
        {step === 1 && (
          <LanguageStep onSelect={handleLanguage} selected={selectedLang} onNext={handleNext} t={t} />
        )}
        {step === 2 && <LocationStep onAllow={() => handleLocationStep(true)} onSkip={() => handleLocationStep(false)} t={t} />}
        {step === 3 && <NotificationStep onAllow={() => handleNotificationStep(true)} onSkip={() => handleNotificationStep(false)} t={t} />}
        {step === 4 && (
          <MosqueStep
            mosques={mosques}
            loading={mosquesLoading}
            error={mosquesError}
            selected={preferredMosqueId}
            onRetry={loadMosques}
            onSelect={setPreferredMosque}
            onNext={handleFinish}
            t={t}
          />
        )}
        {step === 5 && (
          <DoneStep
            checkStyle={checkStyle}
            nextLabel={nextPrayerLabel}
            nextTime={nextPrayerTime}
            onEnter={handleEnterApp}
            t={t}
          />
        )}
      </Animated.View>

      {/* Progress dots */}
      <View style={styles.dots}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === step && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function WelcomeStep({ onNext, t }: { onNext: () => void; t: Function }) {
  return (
    <View style={styles.step}>
      <View style={styles.welcomeTop}>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.appName}>Muslim Community</Text>
        <Text style={styles.appNameSub}>Lithuania</Text>
        <Text style={styles.subtitle}>{t('onboarding.welcome_subtitle')}</Text>
      </View>
      <PrimaryButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}

function LanguageStep({
  onSelect, selected, onNext, t,
}: {
  onSelect: (l: 'en' | 'ru') => void;
  selected: 'en' | 'ru';
  onNext: () => void;
  t: Function;
}) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepTitle}>{t('onboarding.select_language')}</Text>
      <View style={styles.langRow}>
        <TouchableOpacity
          style={[styles.langCard, selected === 'en' && styles.langCardActive]}
          onPress={() => onSelect('en')}
          activeOpacity={0.8}
        >
          <Text style={styles.langFlag}>🇬🇧</Text>
          <Text style={[styles.langLabel, selected === 'en' && styles.langLabelActive]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langCard, selected === 'ru' && styles.langCardActive]}
          onPress={() => onSelect('ru')}
          activeOpacity={0.8}
        >
          <Text style={styles.langFlag}>🇷🇺</Text>
          <Text style={[styles.langLabel, selected === 'ru' && styles.langLabelActive]}>Русский</Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton label={t('onboarding.get_started')} onPress={onNext} />
    </View>
  );
}

function LocationStep({ onAllow, onSkip, t }: { onAllow: () => void; onSkip: () => void; t: Function }) {
  return (
    <View style={styles.step}>
      <MaterialCommunityIcons name="map-marker-radius" size={64} color={Colors.accent} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>{t('onboarding.allow_location_title')}</Text>
      <Text style={styles.stepBody}>{t('onboarding.allow_location_body')}</Text>
      <PrimaryButton label={t('onboarding.allow_location_button')} onPress={onAllow} />
      <SecondaryButton label={t('onboarding.allow_location_skip')} onPress={onSkip} />
    </View>
  );
}

function NotificationStep({ onAllow, onSkip, t }: { onAllow: () => void; onSkip: () => void; t: Function }) {
  return (
    <View style={styles.step}>
      <MaterialCommunityIcons name="bell-ring" size={64} color={Colors.accent} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>{t('onboarding.allow_notifications_title')}</Text>
      <Text style={styles.stepBody}>{t('onboarding.allow_notifications_body')}</Text>
      <PrimaryButton label={t('onboarding.allow_notifications_button')} onPress={onAllow} />
      <SecondaryButton label={t('onboarding.allow_notifications_skip')} onPress={onSkip} />
    </View>
  );
}

function MosqueStep({
  mosques, loading, error, selected, onRetry, onSelect, onNext, t,
}: {
  mosques: Mosque[];
  loading: boolean;
  error: boolean;
  selected: string | null;
  onRetry: () => void;
  onSelect: (id: string | null) => Promise<void>;
  onNext: () => void;
  t: Function;
}) {
  return (
    <View style={styles.step}>
      <MaterialCommunityIcons name="mosque" size={64} color={Colors.accent} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>{t('onboarding.select_mosque_title')}</Text>
      <Text style={styles.stepBody}>{t('onboarding.select_mosque_body')}</Text>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={Colors.accent} />
          <Text style={styles.loadingText}>{t('onboarding.loading_mosques')}</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.loadingBox}>
          <Text style={styles.errorText}>{t('errors.api_failed')}</Text>
          <SecondaryButton label={t('errors.retry')} onPress={onRetry} />
        </View>
      )}

      {!loading && !error && (
        <ScrollView style={styles.mosqueList} showsVerticalScrollIndicator={false}>
          {mosques.map((mosque) => (
            <TouchableOpacity
              key={mosque.id}
              style={[styles.mosqueRow, selected === mosque.id && styles.mosqueRowActive]}
              onPress={() => onSelect(mosque.id)}
              activeOpacity={0.8}
            >
              <View style={styles.mosqueRowText}>
                <Text style={[styles.mosqueName, selected === mosque.id && styles.mosqueNameActive]}>
                  {mosque.name}
                </Text>
                <Text style={styles.mosqueAddress}>{mosque.address}</Text>
              </View>
              {selected === mosque.id && (
                <MaterialCommunityIcons name="check-circle" size={22} color={Colors.accent} />
              )}
            </TouchableOpacity>
          ))}
          {mosques.length === 0 && (
            <Text style={styles.emptyText}>{t('onboarding.no_mosques')}</Text>
          )}
        </ScrollView>
      )}

      <PrimaryButton
        label={selected ? t('onboarding.get_started') : t('onboarding.skip_mosque')}
        onPress={onNext}
      />
    </View>
  );
}

function DoneStep({
  checkStyle, nextLabel, nextTime, onEnter, t,
}: {
  checkStyle: any;
  nextLabel: string;
  nextTime: string;
  onEnter: () => void;
  t: Function;
}) {
  return (
    <View style={styles.step}>
      <Animated.View style={[styles.checkCircle, checkStyle]}>
        <MaterialCommunityIcons name="check" size={56} color={Colors.background} />
      </Animated.View>
      <Text style={styles.stepTitle}>{t('onboarding.done_title')}</Text>
      {nextLabel ? (
        <View style={styles.teaserCard}>
          <Text style={styles.teaserLabel}>{t('onboarding.done_subtitle')}</Text>
          <Text style={styles.teaserPrayer}>{nextLabel}</Text>
          <Text style={styles.teaserTime}>{nextTime}</Text>
        </View>
      ) : null}
      <PrimaryButton label={t('onboarding.enter_app')} onPress={onEnter} />
    </View>
  );
}

// ─── Shared Buttons ───────────────────────────────────────────────────────────

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.primaryBtn} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.secondaryBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.secondaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pager: {
    flex: 1,
  },
  step: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
  },

  // Welcome
  welcomeTop: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  bismillah: {
    fontSize: 28,
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 44,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  appNameSub: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.accentSoft,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  // Generic step
  stepIcon: { marginBottom: 24, marginTop: 16 },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 14,
  },
  stepBody: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },

  // Language selection
  langRow: { flexDirection: 'row', gap: 16, marginVertical: 32 },
  langCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 10,
  },
  langCardActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  langFlag: { fontSize: 40 },
  langLabel: { fontSize: 17, fontWeight: '600', color: Colors.textSecondary },
  langLabelActive: { color: Colors.textPrimary },

  // Mosque selection
  loadingBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  loadingText: { color: Colors.textSecondary, fontSize: 14 },
  errorText: { color: Colors.error, fontSize: 14, textAlign: 'center' },
  mosqueList: { width: '100%', flex: 1, marginBottom: 12 },
  mosqueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    gap: 10,
  },
  mosqueRowActive: { borderColor: Colors.accent, backgroundColor: Colors.surfaceElevated },
  mosqueRowText: { flex: 1 },
  mosqueName: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary, marginBottom: 3 },
  mosqueNameActive: { color: Colors.textPrimary },
  mosqueAddress: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  emptyText: { color: Colors.textSecondary, textAlign: 'center', paddingVertical: 20 },

  // Done screen
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    marginTop: 16,
  },
  teaserCard: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 32,
    gap: 4,
  },
  teaserLabel: { fontSize: 13, color: Colors.textSecondary },
  teaserPrayer: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  teaserTime: { fontSize: 17, color: Colors.accent },

  // Buttons
  primaryBtn: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: Colors.background },
  secondaryBtn: { paddingVertical: 14, marginTop: 4 },
  secondaryBtnText: { fontSize: 15, color: Colors.textSecondary },

  // Progress dots
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.accent,
    width: 22,
  },
});
