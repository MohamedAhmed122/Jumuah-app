import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { PlaceTypeOption, SetFilters } from '../HalalPlacesScreen.types';
import { filterStyles as styles } from './HalalFiltersModal.styles';

interface TypeProps { options: PlaceTypeOption[]; selected: string; setFilters: SetFilters }

export function PlaceTypeChoices({ options, selected, setFilters }: TypeProps) {
  return (
    <View style={styles.chipGrid}>
      {options.map((type) => (
        <TouchableOpacity
          key={type.value}
          style={[styles.choiceChip, selected === type.value && styles.choiceChipActive]}
          onPress={() => setFilters((current) => ({
            ...current,
            placeType: type.value,
            foodCategories: type.value === 'restaurant' ? current.foodCategories : [],
          }))}
        >
          <Text style={[styles.choiceText, selected === type.value && styles.choiceTextActive]}>{type.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

interface CategoryProps { categories: string[]; selected: string[]; setFilters: SetFilters; t: TFunction }

export function FoodCategoryChoices({ categories, selected, setFilters, t }: CategoryProps) {
  return (
    <>
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>{t('map.food_categories')}</Text>
      <View style={styles.chipGrid}>
        {categories.map((category) => {
          const active = selected.includes(category);
          return (
            <TouchableOpacity
              key={category}
              style={[styles.choiceChip, active && styles.choiceChipActive]}
              onPress={() => setFilters((current) => ({
                ...current,
                placeType: 'restaurant',
                foodCategories: active
                  ? current.foodCategories.filter((item) => item !== category)
                  : [...current.foodCategories, category],
              }))}
            >
              <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
