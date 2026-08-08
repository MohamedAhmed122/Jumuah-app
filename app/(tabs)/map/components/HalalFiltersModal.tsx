import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Filters, PlaceTypeOption, SetFilters } from '../HalalPlacesScreen.types';
import { FoodCategoryChoices, PlaceTypeChoices } from './FilterChoices';
import { FilterPreferences } from './FilterPreferences';
import { createSheetStyle, filterStyles as styles } from './HalalFiltersModal.styles';

interface Props {
  visible: boolean;
  bottomInset: number;
  filters: Filters;
  categories: string[];
  placeTypes: PlaceTypeOption[];
  resultCount: number;
  setFilters: SetFilters;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  t: TFunction;
}

export function HalalFiltersModal(props: Props) {
  const { visible, bottomInset, filters, categories, placeTypes, resultCount } = props;
  const { setFilters, onClose, onReset, onApply, t } = props;
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, createSheetStyle(bottomInset)]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{t('map.filters')}</Text>
            <TouchableOpacity onPress={onReset}><Text style={styles.reset}>{t('map.reset')}</Text></TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>{t('map.place_type')}</Text>
            <PlaceTypeChoices options={placeTypes} selected={filters.placeType} setFilters={setFilters} />
            <FoodCategoryChoices categories={categories} selected={filters.foodCategories} setFilters={setFilters} t={t} />
            <FilterPreferences filters={filters} setFilters={setFilters} t={t} />
          </ScrollView>
          <TouchableOpacity style={styles.showButton} onPress={onApply}>
            <Text style={styles.showButtonText}>{t('map.show_results', { count: resultCount })}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
