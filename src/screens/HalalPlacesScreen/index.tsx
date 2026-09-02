import { Text, View } from 'react-native';
import { HalalCityModal } from './components/HalalCityModal';
import { HalalFiltersModal } from './components/HalalFiltersModal';
import { HalalPlacesHeader } from './components/HalalPlacesHeader';
import { HalalPlacesList } from './components/HalalPlacesList';
import { HalalPlacesSearch } from './components/HalalPlacesSearch';
import { useHalalPlacesScreen } from './hooks/HalalPlacesScreen.hooks';
import { createContainerStyle, styles } from './HalalPlacesScreen.styles';
import { HalalPlacesState } from './components/HalalPlacesState';

export default function HalalPlacesScreen() {
  const { t, insets, data, city, filtering, placeTypes, filterActive } = useHalalPlacesScreen();
  return (
    <View style={[styles.container, createContainerStyle(insets.top)]}>
      <HalalPlacesHeader city={city.selectedCity} onCityPress={city.openCity} t={t} />
      <HalalPlacesSearch
        search={filtering.search}
        filterActive={filterActive}
        onSearchChange={filtering.setSearch}
        onFilterPress={filtering.openFilters}
        t={t}
      />
      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>{t('map.results_count', { count: filtering.filteredPlaces.length })}</Text>
        {filtering.filters.placeType !== 'all' && (
          <Text style={styles.activeFilter}>{t(`map.${filtering.filters.placeType}`)}</Text>
        )}
      </View>
      {data.loading ? <HalalPlacesState type="loading" t={t} /> : data.error ? (
        <HalalPlacesState type="error" onRetry={() => data.loadData(true)} t={t} />
      ) : (
        <HalalPlacesList places={filtering.filteredPlaces} refreshing={data.refreshing} onRefresh={data.refresh} t={t} />
      )}
      <HalalFiltersModal
        visible={filtering.filterVisible}
        bottomInset={insets.bottom}
        filters={filtering.draftFilters}
        categories={data.categories}
        placeTypes={placeTypes}
        resultCount={filtering.draftCount}
        setFilters={filtering.setDraftFilters}
        onClose={filtering.closeFilters}
        onReset={filtering.resetDraft}
        onApply={filtering.applyFilters}
        t={t}
      />
      <HalalCityModal
        visible={city.cityVisible}
        cities={city.cityOptions}
        selectedCity={city.selectedCity}
        onClose={city.closeCity}
        onCurrentCity={() => void city.useCurrentCity()}
        onSelectCity={(value) => void city.selectCity(value)}
        t={t}
      />
    </View>
  );
}
