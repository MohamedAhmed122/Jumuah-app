import { Switch, Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { Filters, SetFilters } from '../HalalPlacesScreen.types';
import { PriceRangeSlider } from './PriceRangeSlider';
import { createTrackColors, filterStyles as styles } from './HalalFiltersModal.styles';

interface Props { filters: Filters; setFilters: SetFilters; t: TFunction }

export function FilterPreferences({ filters, setFilters, t }: Props) {
  return (
    <>
      <View style={styles.divider} />
      <View style={styles.switchRow}>
        <View>
          <Text style={styles.sectionTitle}>{t('map.discount_available')}</Text>
          <Text style={styles.sectionHint}>{t('map.discount_hint')}</Text>
        </View>
        <Switch
          value={filters.discountOnly}
          onValueChange={(discountOnly) => setFilters((current) => ({ ...current, discountOnly }))}
          trackColor={createTrackColors()}
          thumbColor={filters.discountOnly ? Colors.accent : Colors.textSecondary}
        />
      </View>
      {filters.placeType === 'restaurant' && (
        <>
          <View style={styles.divider} />
          <View style={styles.priceHeader}>
            <Text style={styles.sectionTitle}>{t('map.average_price')}</Text>
            <Text style={styles.priceRange}>€{filters.minPrice}–€{filters.maxPrice}</Text>
          </View>
          <PriceRangeSlider
            low={filters.minPrice}
            high={filters.maxPrice}
            onChange={(minPrice, maxPrice) => setFilters((current) => ({ ...current, minPrice, maxPrice }))}
          />
        </>
      )}
    </>
  );
}
