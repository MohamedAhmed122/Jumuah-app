import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { DoneStep } from './components/DoneStep';
import { LanguageStep } from './components/LanguageStep';
import { LocationStep } from './components/LocationStep';
import { MosqueStep } from './components/MosqueStep';
import { NotificationStep } from './components/NotificationStep';
import { ProgressDots } from './components/ProgressDots';
import { WelcomeStep } from './components/WelcomeStep';
import { useOnboardingScreen } from './hooks/OnboardingScreen.hooks';
import { createRootInsets, styles } from './OnboardingScreen.styles';

export default function OnboardingScreen() {
  const { t, insets, navigation, mosque, permissions, completion } = useOnboardingScreen();
  return (
    <View style={[styles.root, createRootInsets(insets.top, insets.bottom)]}>
      <Animated.View style={[styles.pager, navigation.pagerStyle]}>
        {navigation.step === 0 && <WelcomeStep onNext={navigation.next} t={t} />}
        {navigation.step === 1 && (
          <LanguageStep
            selected={permissions.selectedLanguage}
            onSelect={permissions.selectLanguage}
            onNext={navigation.next}
            t={t}
          />
        )}
        {navigation.step === 2 && (
          <LocationStep
            onAllow={permissions.allowLocation}
            onSkip={permissions.skipLocation}
            t={t}
          />
        )}
        {navigation.step === 3 && (
          <NotificationStep
            onAllow={permissions.allowNotifications}
            onSkip={permissions.skipNotifications}
            t={t}
          />
        )}
        {navigation.step === 4 && (
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
        {navigation.step === 5 && (
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
