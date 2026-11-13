import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './HalalPlacesState.styles';

interface Props {
  type: 'loading' | 'error' | 'empty';
  onRetry?: () => void;
  t: TFunction;
}

export function HalalPlacesState({ type, onRetry, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  if (type === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={styles.text}>{t('map.loading_map')}</Text>
      </View>
    );
  }
  if (type === 'error') {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="wifi-off" size={44} color={colors.textSecondary} />
        <Text style={styles.text}>{t('errors.network')}</Text>
        <TouchableOpacity style={styles.retry} onPress={onRetry}>
          <Text style={styles.retryText}>{t('errors.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.empty}>
      <MaterialCommunityIcons name="store-search-outline" size={52} color={colors.border} />
      <Text style={styles.emptyTitle}>{t('map.no_locations')}</Text>
      <Text style={styles.emptyBody}>{t('map.reset')}</Text>
    </View>
  );
}
