import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import { styles } from './HalalPlacesSearch.styles';

interface Props {
  search: string;
  filterActive: boolean;
  onSearchChange: (value: string) => void;
  onFilterPress: () => void;
  t: TFunction;
}

export function HalalPlacesSearch({ search, filterActive, onSearchChange, onFilterPress, t }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.box}>
        <MaterialCommunityIcons name="magnify" size={21} color={Colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={t('map.search_places')}
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
        />
        {!!search && (
          <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={8}>
            <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <MaterialCommunityIcons name="tune-variant" size={22} color={Colors.background} />
        {filterActive && <View style={styles.filterDot} />}
      </TouchableOpacity>
    </View>
  );
}
