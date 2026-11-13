import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { themedStyles } from './HalalPlacesSearch.styles';

interface Props {
  search: string;
  filterActive: boolean;
  onSearchChange: (value: string) => void;
  onFilterPress: () => void;
  t: TFunction;
}

export function HalalPlacesSearch({ search, filterActive, onSearchChange, onFilterPress, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const colors = useThemeColors();
  return (
    <View style={styles.row}>
      <View style={styles.box}>
        <MaterialCommunityIcons name="magnify" size={21} color={colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={t('map.search_places')}
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        {!!search && (
          <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={8}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <MaterialCommunityIcons name="tune-variant" size={22} color={colors.onAccent} />
        {filterActive && <View style={styles.filterDot} />}
      </TouchableOpacity>
    </View>
  );
}
