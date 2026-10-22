import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@src/hooks/useTheme';
import { createThemedStyles } from '@src/theme';

export default function QuizResultsScreen() {
  const styles = useThemedStyles(themedStyles);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('quiz.phase_placeholder', { title: t('quiz.results_title') })}</Text>
    </View>
  );
}

const themedStyles = createThemedStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.textPrimary },
}));
