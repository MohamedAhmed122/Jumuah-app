import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TFunction } from 'i18next';
import { Text, View } from 'react-native';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './TvSilenceBanner.styles';

interface Props {
  t: TFunction;
}

export function TvSilenceBanner({ t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.banner}>
      <MaterialCommunityIcons name="cellphone-off" size={52} color={colors.accent} />
      <Text style={styles.text}>{t('tv.silence_phones')}</Text>
    </View>
  );
}
