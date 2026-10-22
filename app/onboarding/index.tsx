import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemedStyles } from '@src/hooks/useTheme';
import { DoneStep } from './components/DoneStep';
import { LanguageStep } from './components/LanguageStep';
import { LocationStep } from './components/LocationStep';
import { MosqueStep } from './components/MosqueStep';
import { NotificationStep } from './components/NotificationStep';
import { ProgressDots } from './components/ProgressDots';
import { ThemeStep } from './components/ThemeStep';
import { WelcomeStep } from './components/WelcomeStep';
import { useOnboardingScreen } from './hooks/OnboardingScreen.hooks';
import { ONBOARDING_STEPS } from './OnboardingScreen.constants';
import { createRootInsets, themedStyles } from './OnboardingScreen.styles';

export default function OnboardingScreen() {
  const styles = useThemedStyles(themedStyles);
  const { t, insets, navigation, mosque, permissions, theme, completion, openPrivacy } = useOnboardingScreen();
  return (
    <View style={[styles.root, createRootInsets(insets.top, insets.bottom)]}>
      <Animated.View style={[styles.pager, navigation.pagerStyle]}>
        {navigation.step === ONBOARDING_STEPS.welcome && (
          <WelcomeStep onNext={navigation.next} onPrivacyPress={openPrivacy} t={t} />
        )}
        {navigation.step === ONBOARDING_STEPS.language && (
          <LanguageStep
            selected={permissions.selectedLanguage}
            onSelect={permissions.selectLanguage}
            onNext={navigation.next}
            t={t}
          />
        )}
        {navigation.step === ONBOARDING_STEPS.theme && (
          <ThemeStep
            selected={theme.selectedTheme}
            onSelect={theme.selectTheme}
            onNext={navigation.next}
            t={t}
          />
        )}
        {navigation.step === ONBOARDING_STEPS.location && (
          <LocationStep
            onAllow={permissions.allowLocation}
            onSkip={permissions.skipLocation}
            t={t}
          />
        )}
        {navigation.step === ONBOARDING_STEPS.notifications && (
          <NotificationStep
            onAllow={permissions.allowNotifications}
            onSkip={permissions.skipNotifications}
            t={t}
          />
        )}
        {navigation.step === ONBOARDING_STEPS.mosque && (
          <MosqueStep
            mosques={mosque.mosques}
            loading={mosque.loading}
            error={mosque.error}
            selected={mosque.selectedMosqueId}
            onRetry={mosque.loadMosques}
            onSelect={mosque.selectMosque}
            onNext={completion.finish}
            t={t}
          />
        )}
        {navigation.step === ONBOARDING_STEPS.done && (
          <DoneStep
            checkStyle={completion.checkStyle}
            nextLabel={completion.nextPrayerLabel}
            nextTime={completion.nextPrayerTime}
            onEnter={completion.enterApp}
            t={t}
          />
        )}
      </Animated.View>
      <ProgressDots activeStep={navigation.step} />
    </View>
  );
}
