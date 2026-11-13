import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import type { DoneStepProps } from '../OnboardingScreen.types';
import { OnboardingButton } from './OnboardingButton';
import { themedStepStyles, themedStyles } from './DoneStep.styles';

export function DoneStep(props: DoneStepProps) {
  const stepStyles = useThemedStyles(themedStepStyles);
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  const { checkStyle, nextLabel, nextTime, onEnter, t } = props;
  return (
    <View style={stepStyles.step}>
      <Animated.View style={[styles.checkCircle, checkStyle]}>
        <MaterialCommunityIcons name="check" size={56} color={colors.onAccent} />
      </Animated.View>
      <Text style={stepStyles.title}>{t('onboarding.done_title')}</Text>
      {!!nextLabel && (
        <View style={styles.teaser}>
          <Text style={styles.teaserLabel}>{t('onboarding.done_subtitle')}</Text>
          <Text style={styles.teaserPrayer}>{nextLabel}</Text>
          <Text style={styles.teaserTime}>{nextTime}</Text>
        </View>
      )}
      <OnboardingButton label={t('onboarding.enter_app')} onPress={onEnter} />
    </View>
  );
}
