import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  PanResponder,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@constants/Colors';
import { fetchHalalCategories, fetchLocationBundle, type HalalPlace } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

type PlaceType = 'all' | HalalPlace['category'];

interface Filters {
  placeType: PlaceType;
  foodCategories: string[];
  discountOnly: boolean;
  minPrice: number;
  maxPrice: number;
}

const PRICE_MIN = 0;
const PRICE_MAX = 50;
const DEFAULT_FILTERS: Filters = {
  placeType: 'all',
  foodCategories: [],
  discountOnly: false,
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const radius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function plainText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function isOpenNow(hours?: string): boolean | null {
  if (!hours) return null;
  const match = hours.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, openHour, openMinute, closeHour, closeMinute] = match.map(Number);
  const current = new Date().getHours() * 60 + new Date().getMinutes();
  return current >= openHour * 60 + openMinute && current < closeHour * 60 + closeMinute;
}

function matchesFilters(place: HalalPlace, filters: Filters): boolean {
  if (filters.placeType !== 'all' && place.category !== filters.placeType) return false;
  if (filters.foodCategories.length > 0) {
    const categories = new Set((place.foodCategories ?? []).map((category) => category.toLocaleLowerCase()));
    if (!filters.foodCategories.every((category) => categories.has(category.toLocaleLowerCase()))) return false;
  }
  if (filters.discountOnly && !(place.discountPercent && place.discountPercent > 0)) return false;
  if (filters.placeType === 'restaurant') {
    if (place.averageMealCost == null) return false;
    if (place.averageMealCost < filters.minPrice || place.averageMealCost > filters.maxPrice) return false;
  }
  return true;
}

function RangeSlider({
  low,
  high,
  onChange,
}: {
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
}) {
  const [width, setWidth] = useState(1);
  const lowStart = useRef(low);
  const highStart = useRef(high);

  const lowResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { lowStart.current = low; },
    onPanResponderMove: (_event, gesture) => {
      const next = Math.max(PRICE_MIN, Math.min(high - 1, Math.round(lowStart.current + (gesture.dx / width) * PRICE_MAX)));
      onChange(next, high);
    },
  }), [high, low, onChange, width]);

  const highResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { highStart.current = high; },
    onPanResponderMove: (_event, gesture) => {
      const next = Math.min(PRICE_MAX, Math.max(low + 1, Math.round(highStart.current + (gesture.dx / width) * PRICE_MAX)));
      onChange(low, next);
    },
  }), [high, low, onChange, width]);

  const lowPercent = (low / PRICE_MAX) * 100;
  const highPercent = (high / PRICE_MAX) * 100;

  return (
    <View style={styles.sliderWrap} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      <View style={styles.sliderTrack} />
      <View style={[styles.sliderFill, { left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` }]} />
      <View
        {...lowResponder.panHandlers}
        style={[styles.sliderTouch, { left: `${lowPercent}%`, transform: [{ translateX: -18 }] }]}
        accessibilityRole="adjustable"
        accessibilityLabel={`Minimum price €${low}`}
      >
        <View style={styles.sliderThumb} />
      </View>
      <View
        {...highResponder.panHandlers}
        style={[styles.sliderTouch, { left: `${highPercent}%`, transform: [{ translateX: -18 }] }]}
        accessibilityRole="adjustable"
        accessibilityLabel={`Maximum price €${high}`}
      >
        <View style={styles.sliderThumb} />
      </View>
    </View>
  );
}

export default function HalalPlacesScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { userCoordinates, preferredHalalCity, setPreferredHalalCity } = useSettingsStore();
  const [places, setPlaces] = useState<HalalPlace[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(preferredHalalCity ?? 'Vilnius');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);

  const cityOptions = useMemo(() => [...new Set(
    places.map((place) => place.city).filter(Boolean),
  )].sort((a, b) => a.localeCompare(b)), [places]);

  const loadData = useCallback(async (forceRefresh = false) => {
    try {
      setError(false);
      const [bundle, remoteCategories] = await Promise.all([
        fetchLocationBundle(forceRefresh),
        fetchHalalCategories().catch(() => []),
      ]);
      setPlaces(bundle.halal);
      setCategories([...new Set([
        ...remoteCategories,
        ...bundle.halal.flatMap((place) => place.foodCategories ?? []),
      ])].sort((a, b) => a.localeCompare(b)));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  useEffect(() => {
    if (preferredHalalCity) {
      setSelectedCity(preferredHalalCity);
      return;
    }
    if (places.length === 0) return;
    void Location.reverseGeocodeAsync({ latitude: userCoordinates.lat, longitude: userCoordinates.lng })
      .then(([location]) => {
        const detected = location?.city || location?.subregion || '';
        const match = cityOptions.find((city) => city.toLocaleLowerCase() === detected.toLocaleLowerCase());
        setSelectedCity(match ?? (cityOptions.includes('Vilnius') ? 'Vilnius' : cityOptions[0] ?? 'Vilnius'));
      })
      .catch(() => setSelectedCity(cityOptions.includes('Vilnius') ? 'Vilnius' : cityOptions[0] ?? 'Vilnius'));
  }, [cityOptions, places.length, preferredHalalCity, userCoordinates]);

  const basePlaces = useMemo(() => places
    .filter((place) => !selectedCity || place.city === selectedCity)
    .filter((place) => {
      const query = search.trim().toLocaleLowerCase();
      if (!query) return true;
      return [place.name, place.address, place.city, plainText(place.descriptionHtml), ...(place.foodCategories ?? [])]
        .some((value) => value?.toLocaleLowerCase().includes(query));
    }), [places, search, selectedCity]);

  const filteredPlaces = useMemo(() => basePlaces
    .filter((place) => matchesFilters(place, filters))
    .map((place) => ({
      ...place,
      distanceKm: haversineKm(userCoordinates.lat, userCoordinates.lng, place.lat, place.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm), [basePlaces, filters, userCoordinates]);

  const draftCount = useMemo(() => basePlaces.filter((place) => matchesFilters(place, draftFilters)).length, [basePlaces, draftFilters]);

  const placeTypes: Array<{ value: PlaceType; label: string }> = [
    { value: 'all', label: t('map.filter_all') },
    { value: 'restaurant', label: t('map.restaurant') },
    { value: 'fast_food', label: t('map.fast_food') },
    { value: 'grocery', label: t('map.grocery') },
    { value: 'supermarket_halal', label: t('map.supermarket_halal') },
  ];

  const selectCity = async (city: string) => {
    setSelectedCity(city);
    await setPreferredHalalCity(city);
    setCityVisible(false);
  };

  const useCurrentCity = async () => {
    await setPreferredHalalCity(null);
    setCityVisible(false);
    try {
      const [location] = await Location.reverseGeocodeAsync({ latitude: userCoordinates.lat, longitude: userCoordinates.lng });
      const detected = location?.city || location?.subregion || '';
      const match = cityOptions.find((city) => city.toLocaleLowerCase() === detected.toLocaleLowerCase());
      setSelectedCity(match ?? (cityOptions.includes('Vilnius') ? 'Vilnius' : cityOptions[0] ?? 'Vilnius'));
    } catch {
      setSelectedCity(cityOptions.includes('Vilnius') ? 'Vilnius' : cityOptions[0] ?? 'Vilnius');
    }
  };

  const openFilters = () => {
    setDraftFilters({ ...filters, foodCategories: [...filters.foodCategories] });
    setFilterVisible(true);
  };

  const resetDraft = () => setDraftFilters({ ...DEFAULT_FILTERS, foodCategories: [] });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{t('map.halal_food')}</Text>
          <Text style={styles.title}>{t('map.places_title')}</Text>
        </View>
        <TouchableOpacity style={styles.cityButton} onPress={() => setCityVisible(true)}>
          <MaterialCommunityIcons name="map-marker-radius" size={17} color={Colors.accent} />
          <Text style={styles.cityButtonText} numberOfLines={1}>{selectedCity}</Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={21} color={Colors.textSecondary} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={t('map.search_places')}
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
          />
          {!!search && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
              <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={openFilters}>
          <MaterialCommunityIcons name="tune-variant" size={22} color={Colors.background} />
          {(filters.placeType !== 'all' || filters.foodCategories.length > 0 || filters.discountOnly) && <View style={styles.filterDot} />}
        </TouchableOpacity>
      </View>

      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>{t('map.results_count', { count: filteredPlaces.length })}</Text>
        {filters.placeType !== 'all' && <Text style={styles.activeFilter}>{t(`map.${filters.placeType}`)}</Text>}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} size="large" />
          <Text style={styles.stateText}>{t('map.loading_map')}</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
          <Text style={styles.stateText}>{t('errors.network')}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadData(true)}>
            <Text style={styles.retryText}>{t('errors.retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); void loadData(true); }}
              tintColor={Colors.accent}
              colors={[Colors.accent]}
            />
          )}
          ListEmptyComponent={(
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="store-search-outline" size={52} color={Colors.border} />
              <Text style={styles.emptyTitle}>{t('map.no_locations')}</Text>
              <Text style={styles.emptyBody}>{t('map.reset')}</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const open = isOpenNow(item.hours);
            return (
              <TouchableOpacity
                style={[styles.placeCard, item.discountPercent ? styles.placeCardOffer : null]}
                activeOpacity={0.84}
                onPress={() => router.push({ pathname: '/item/[type]/[id]', params: { type: 'halal', id: item.id } })}
              >
                {!!item.discountPercent && <View style={styles.offerRail} />}
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.placeImage} resizeMode="cover" />
                ) : (
                  <View style={styles.placeImageFallback}>
                    <MaterialCommunityIcons name="storefront-outline" size={30} color={Colors.accent} />
                  </View>
                )}
                <View style={styles.placeBody}>
                  <View style={styles.placeTopRow}>
                    <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
                    {!!item.discountPercent && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{t('map.discount_off', { discount: item.discountPercent })}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.typeText}>{t(`map.${item.category}`)}</Text>
                  <View style={styles.addressRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={14} color={Colors.accent} />
                    <Text style={styles.addressText} numberOfLines={1}>{item.address}</Text>
                  </View>
                  <View style={styles.placeMeta}>
                    <Text style={styles.distanceText}>{t('map.distance', { km: item.distanceKm.toFixed(1) })}</Text>
                    {open !== null && <Text style={[styles.openText, { color: open ? Colors.accent : Colors.error }]}>{open ? t('map.open_now') : t('map.closed')}</Text>}
                  </View>
                  {(item.foodCategories?.length || item.averageMealCost != null) && (
                    <View style={styles.foodMeta}>
                      {!!item.foodCategories?.length && <Text style={styles.foodCategories} numberOfLines={1}>{item.foodCategories.slice(0, 3).join(' • ')}</Text>}
                      {item.averageMealCost != null && <Text style={styles.priceText}>{t('map.average_for_one', { price: item.averageMealCost.toFixed(0) })}</Text>}
                    </View>
                  )}
                  {!!item.promoCode && <Text style={styles.promoText}>{t('map.promo_code', { code: item.promoCode })}</Text>}
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.border} />
              </TouchableOpacity>
            );
          }}
        />
      )}

      <Modal transparent visible={filterVisible} animationType="slide" onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setFilterVisible(false)} />
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 18 }]}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{t('map.filters')}</Text>
              <TouchableOpacity onPress={resetDraft}><Text style={styles.resetText}>{t('map.reset')}</Text></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>{t('map.place_type')}</Text>
              <View style={styles.chipGrid}>
                {placeTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[styles.choiceChip, draftFilters.placeType === type.value && styles.choiceChipActive]}
                    onPress={() => setDraftFilters((current) => ({
                      ...current,
                      placeType: type.value,
                      foodCategories: type.value === 'restaurant' ? current.foodCategories : [],
                    }))}
                  >
                    <Text style={[styles.choiceText, draftFilters.placeType === type.value && styles.choiceTextActive]}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>{t('map.food_categories')}</Text>
              <View style={styles.chipGrid}>
                {categories.map((category) => {
                  const selected = draftFilters.foodCategories.includes(category);
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[styles.choiceChip, selected && styles.choiceChipActive]}
                      onPress={() => setDraftFilters((current) => ({
                        ...current,
                        placeType: 'restaurant',
                        foodCategories: selected
                          ? current.foodCategories.filter((item) => item !== category)
                          : [...current.foodCategories, category],
                      }))}
                    >
                      <Text style={[styles.choiceText, selected && styles.choiceTextActive]}>{category}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.divider} />
              <View style={styles.switchRow}>
                <View>
                  <Text style={styles.sectionTitle}>{t('map.discount_available')}</Text>
                  <Text style={styles.sectionHint}>{t('map.discount_hint')}</Text>
                </View>
                <Switch
                  value={draftFilters.discountOnly}
                  onValueChange={(value) => setDraftFilters((current) => ({ ...current, discountOnly: value }))}
                  trackColor={{ false: Colors.border, true: Colors.accent + '88' }}
                  thumbColor={draftFilters.discountOnly ? Colors.accent : Colors.textSecondary}
                />
              </View>

              {draftFilters.placeType === 'restaurant' && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.priceHeader}>
                    <Text style={styles.sectionTitle}>{t('map.average_price')}</Text>
                    <Text style={styles.priceRange}>€{draftFilters.minPrice}–€{draftFilters.maxPrice}</Text>
                  </View>
                  <RangeSlider
                    low={draftFilters.minPrice}
                    high={draftFilters.maxPrice}
                    onChange={(minPrice, maxPrice) => setDraftFilters((current) => ({ ...current, minPrice, maxPrice }))}
                  />
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => { setFilters(draftFilters); setFilterVisible(false); }}
            >
              <Text style={styles.showButtonText}>{t('map.show_results', { count: draftCount })}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={cityVisible} animationType="fade" onRequestClose={() => setCityVisible(false)}>
        <View style={styles.cityOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setCityVisible(false)} />
          <View style={styles.cityModal}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{t('map.select_city')}</Text>
              <TouchableOpacity onPress={() => setCityVisible(false)}><MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} /></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.currentCityRow} onPress={() => void useCurrentCity()}>
              <MaterialCommunityIcons name="crosshairs-gps" size={20} color={Colors.accent} />
              <Text style={styles.currentCityText}>{t('map.current_location')}</Text>
            </TouchableOpacity>
            <FlatList
              data={cityOptions}
              keyExtractor={(city) => city}
              style={styles.cityList}
              renderItem={({ item: city }) => (
                <TouchableOpacity style={styles.cityRow} onPress={() => void selectCity(city)}>
                  <Text style={[styles.cityText, selectedCity === city && styles.cityTextActive]}>{city}</Text>
                  {selectedCity === city && <MaterialCommunityIcons name="check" size={20} color={Colors.accent} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 12, paddingBottom: 14 },
  eyebrow: { color: Colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { color: Colors.textPrimary, fontSize: 27, fontWeight: '800', marginTop: 2 },
  cityButton: { maxWidth: 165, flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 8, backgroundColor: Colors.surface },
  cityButtonText: { flexShrink: 1, color: Colors.textPrimary, fontSize: 12, fontWeight: '600' },
  searchRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 15 },
  searchBox: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9 },
  searchInput: { flex: 1, color: Colors.textPrimary, fontSize: 14, paddingVertical: 0 },
  filterButton: { width: 50, height: 50, borderRadius: 15, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' },
  filterDot: { position: 'absolute', right: 7, top: 7, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error, borderWidth: 1, borderColor: Colors.background },
  resultHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginBottom: 10 },
  resultCount: { color: Colors.textSecondary, fontSize: 12 },
  activeFilter: { color: Colors.accent, fontSize: 12, fontWeight: '700' },
  list: { paddingHorizontal: 16, paddingBottom: 28, gap: 11, flexGrow: 1 },
  placeCard: { minHeight: 132, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 16, padding: 11, overflow: 'hidden' },
  placeCardOffer: { borderColor: Colors.accent + '88' },
  offerRail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: Colors.accent },
  placeImage: { width: 92, height: 108, borderRadius: 12, backgroundColor: Colors.surfaceElevated },
  placeImageFallback: { width: 92, height: 108, borderRadius: 12, backgroundColor: Colors.surfaceElevated, alignItems: 'center', justifyContent: 'center' },
  placeBody: { flex: 1, minWidth: 0, gap: 4 },
  placeTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  placeName: { flex: 1, color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
  discountBadge: { backgroundColor: Colors.accent, borderRadius: 7, paddingHorizontal: 6, paddingVertical: 3 },
  discountText: { color: Colors.background, fontSize: 9, fontWeight: '800' },
  typeText: { color: Colors.accentSoft, fontSize: 11, fontWeight: '600' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  addressText: { flex: 1, color: Colors.textSecondary, fontSize: 11 },
  placeMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  distanceText: { color: Colors.textSecondary, fontSize: 10 },
  openText: { fontSize: 10, fontWeight: '700' },
  foodMeta: { gap: 1 },
  foodCategories: { color: Colors.textPrimary, fontSize: 10 },
  priceText: { color: Colors.accentSoft, fontSize: 10, fontWeight: '600' },
  promoText: { color: Colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  stateText: { color: Colors.textSecondary, textAlign: 'center' },
  retryButton: { backgroundColor: Colors.accent, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 20 },
  retryText: { color: Colors.background, fontWeight: '700' },
  emptyState: { alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 },
  emptyTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
  emptyBody: { color: Colors.textSecondary, fontSize: 13 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000088' },
  sheet: { maxHeight: '88%', backgroundColor: Colors.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10 },
  sheetHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 14 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  sheetTitle: { color: Colors.textPrimary, fontSize: 22, fontWeight: '800' },
  resetText: { color: Colors.accent, fontSize: 14, fontWeight: '600' },
  sectionTitle: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  sectionHint: { color: Colors.textSecondary, fontSize: 10, marginTop: 2 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  choiceChip: { borderWidth: 1, borderColor: Colors.border, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 9, backgroundColor: Colors.background },
  choiceChipActive: { borderColor: Colors.accent, backgroundColor: Colors.accent },
  choiceText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  choiceTextActive: { color: Colors.background },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 20 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRange: { color: Colors.accent, fontSize: 15, fontWeight: '800' },
  sliderWrap: { height: 54, marginHorizontal: 10, marginTop: 10, justifyContent: 'center' },
  sliderTrack: { height: 5, borderRadius: 3, backgroundColor: Colors.border },
  sliderFill: { position: 'absolute', height: 5, borderRadius: 3, backgroundColor: Colors.accent },
  sliderTouch: { position: 'absolute', width: 36, height: 48, alignItems: 'center', justifyContent: 'center' },
  sliderThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.accent, borderWidth: 3, borderColor: Colors.surface },
  showButton: { backgroundColor: Colors.accent, borderRadius: 15, paddingVertical: 15, alignItems: 'center', marginTop: 18 },
  showButtonText: { color: Colors.background, fontSize: 15, fontWeight: '800' },
  cityOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000099', paddingHorizontal: 20 },
  cityModal: { width: '100%', maxHeight: '72%', backgroundColor: Colors.surface, borderRadius: 22, padding: 18, borderWidth: 1, borderColor: Colors.border },
  currentCityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, backgroundColor: Colors.accent + '18', marginBottom: 8 },
  currentCityText: { color: Colors.accent, fontWeight: '700' },
  cityList: { flexGrow: 0 },
  cityRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Colors.border, paddingHorizontal: 4 },
  cityText: { color: Colors.textSecondary, fontSize: 15 },
  cityTextActive: { color: Colors.accent, fontWeight: '700' },
});
