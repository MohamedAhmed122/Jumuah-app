import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, type Region } from 'react-native-maps';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Colors } from '@constants/Colors';
import { fetchLocationBundle, type HalalPlace, type Mosque } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

type MapTab = 'mosques' | 'halal' | 'butchers';
type CategoryFilter = 'all' | HalalPlace['category'];
type DirectionsApp = 'waze' | 'google' | 'apple' | 'native';
type MosqueCard = Mosque & { distanceKm: number; kind: 'mosque' };
type HalalCard = HalalPlace & { distanceKm: number; kind: 'halal' };
type MapCard = MosqueCard | HalalCard;

const CATEGORY_COLORS: Record<HalalPlace['category'], string> = {
  restaurant: '#F59E0B',
  grocery: '#3B82F6',
  fast_food: '#EF4444',
  supermarket_halal: '#8B5CF6',
};

const DEFAULT_REGION: Region = {
  latitude: 55.05,
  longitude: 24.2,
  latitudeDelta: 0.32,
  longitudeDelta: 0.32,
};

const FOCUS_DELTA = 0.018;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isOpenNow(hours?: string): boolean | null {
  if (!hours) return null;
  const m = hours.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const [, oh, om, ch, cm] = m.map(Number);
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= oh * 60 + om && cur < ch * 60 + cm;
}

function htmlToPlainText(html: string) {
  return html
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function buildDirectionsUrl(app: DirectionsApp, lat: number, lng: number, label: string) {
  const encodedLabel = encodeURIComponent(label);
  if (app === 'waze') return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  if (app === 'google') return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  if (app === 'apple') return `http://maps.apple.com/?daddr=${lat},${lng}&q=${encodedLabel}`;
  return Platform.OS === 'ios'
    ? `maps://0,0?q=${encodedLabel}&ll=${lat},${lng}`
    : `geo:${lat},${lng}?q=${lat},${lng}(${encodedLabel})`;
}

function imageSource(uri?: string) {
  return uri ? { uri } : null;
}

function distanceKm(userLat: number, userLng: number, lat: number, lng: number) {
  return haversineKm(userLat, userLng, lat, lng);
}

function focusRegion(lat: number, lng: number): Region {
  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta: FOCUS_DELTA,
    longitudeDelta: FOCUS_DELTA,
  };
}

function mosqueSnippet(mosque: Mosque, t: (key: string, opts?: Record<string, unknown>) => string) {
  const parts = [mosque.address, mosque.hours, mosque.jumuahTimes?.first, mosque.jumuahTimes?.second].filter(Boolean);
  return parts.length > 0 ? parts.join(' • ') : t('map.no_details');
}

function halalSnippet(place: HalalPlace) {
  const description = htmlToPlainText(place.descriptionHtml);
  return [place.address, place.hours, description].filter(Boolean).join(' • ');
}

export default function MapScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { userCoordinates } = useSettingsStore();
  const mapRef = useRef<MapView>(null);

  const [activeTab, setActiveTab] = useState<MapTab>('mosques');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [halalPlaces, setHalalPlaces] = useState<HalalPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [directionsTarget, setDirectionsTarget] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [cardsVisible, setCardsVisible] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const bundle = await fetchLocationBundle();
      setMosques(bundle.mosques);
      setHalalPlaces(bundle.halal);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setCardsVisible(true);
  }, [activeTab]);

  const filteredHalal = useMemo(
    () => (categoryFilter === 'all' ? halalPlaces : halalPlaces.filter((p) => p.category === categoryFilter)),
    [halalPlaces, categoryFilter],
  );

  const butchers = useMemo<HalalCard[]>(
    () =>
      halalPlaces
        .filter((p) => p.category === 'grocery' || p.category === 'supermarket_halal')
        .map((p) => ({
          ...p,
          distanceKm: distanceKm(userCoordinates.lat, userCoordinates.lng, p.lat, p.lng),
          kind: 'halal' as const,
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm),
    [halalPlaces, userCoordinates],
  );

  const currentMosques = useMemo<MosqueCard[]>(
    () =>
      mosques.map((mosque) => ({
        ...mosque,
        distanceKm: distanceKm(userCoordinates.lat, userCoordinates.lng, mosque.lat, mosque.lng),
        kind: 'mosque' as const,
      })),
    [mosques, userCoordinates],
  );

  const currentHalal = useMemo<HalalCard[]>(
    () =>
      filteredHalal.map((place) => ({
        ...place,
        distanceKm: distanceKm(userCoordinates.lat, userCoordinates.lng, place.lat, place.lng),
        kind: 'halal' as const,
      })),
    [filteredHalal, userCoordinates],
  );

  const activeCards: MapCard[] = activeTab === 'mosques' ? currentMosques : activeTab === 'halal' ? currentHalal : butchers;

  const TABS: { key: MapTab; label: string }[] = [
    { key: 'mosques', label: t('map.mosques') },
    { key: 'halal', label: t('map.halal_food') },
    { key: 'butchers', label: t('map.butchers') },
  ];

  const CATEGORY_FILTERS: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t('map.filter_all') },
    { key: 'restaurant', label: t('map.restaurant') },
    { key: 'grocery', label: t('map.grocery') },
    { key: 'fast_food', label: t('map.fast_food') },
    { key: 'supermarket_halal', label: t('map.supermarket_halal') },
  ];

  const focusItem = (item: { id: string; lat: number; lng: number }) => {
    setCardsVisible(true);
    setSelectedId(item.id);
    mapRef.current?.animateToRegion(focusRegion(item.lat, item.lng), 450);
  };

  const openDirectionsChooser = (item: { lat: number; lng: number; name: string }) => {
    setDirectionsTarget(item);
  };

  const openDirections = async (app: DirectionsApp) => {
    if (!directionsTarget) return;
    const url = buildDirectionsUrl(app, directionsTarget.lat, directionsTarget.lng, directionsTarget.name);
    setDirectionsTarget(null);
    await Linking.openURL(url);
  };

  const renderCard = (
    item: MapCard,
  ) => {
    const isMosque = item.kind === 'mosque';
    const isSelected = selectedId === item.id;
    const openStatus = !isMosque ? isOpenNow((item as HalalPlace).hours) : null;
    const image = imageSource((item as Mosque | HalalPlace).image);
    const imageFallbackIcon = isMosque ? 'mosque' : 'silverware-fork-knife';
    const description = isMosque
      ? mosqueSnippet(item as Mosque, t)
      : htmlToPlainText((item as HalalPlace).descriptionHtml) || (item as HalalPlace).address;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        activeOpacity={0.9}
        onPress={() => focusItem(item)}
      >
        {image ? (
          <Image source={image} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={styles.cardImageFallback}>
            <MaterialCommunityIcons name={imageFallbackIcon} size={28} color={Colors.accent} />
          </View>
        )}

        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardTitleWrap}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.metaRow}>
                <View style={styles.distancePill}>
                  <Text style={styles.distanceText}>
                    {t('map.distance', { km: item.distanceKm.toFixed(1) })}
                  </Text>
                </View>
                {!isMosque && openStatus !== null && (
                  <View style={[styles.statusPill, { backgroundColor: openStatus ? Colors.accent + '22' : Colors.error + '22' }]}>
                    <Text style={[styles.statusText, { color: openStatus ? Colors.accent : Colors.error }]}>
                      {openStatus ? t('map.open_now') : t('map.closed')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {!isMosque && (
              <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[(item as HalalPlace).category] + '22' }]}>
                <View style={[styles.badgeDot, { backgroundColor: CATEGORY_COLORS[(item as HalalPlace).category] }]} />
                <Text style={[styles.badgeText, { color: CATEGORY_COLORS[(item as HalalPlace).category] }]}>
                  {t(`map.${(item as HalalPlace).category}`)}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.addressText} numberOfLines={2}>
            {item.address}
          </Text>
          <Text style={styles.detailsText} numberOfLines={3}>
            {description}
          </Text>

          {isMosque && (
            <View style={styles.jumuahRow}>
              {(item as Mosque).jumuahTimes?.first && (
                <View style={styles.jumuahPill}>
                  <Text style={styles.jumuahPillLabel}>{t('map.jumuah_first')}</Text>
                  <Text style={styles.jumuahPillTime}>{(item as Mosque).jumuahTimes?.first}</Text>
                </View>
              )}
              {(item as Mosque).jumuahTimes?.second && (
                <View style={styles.jumuahPill}>
                  <Text style={styles.jumuahPillLabel}>{t('map.jumuah_second')}</Text>
                  <Text style={styles.jumuahPillTime}>{(item as Mosque).jumuahTimes?.second}</Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.cardActionBtn}
              onPress={() => openDirectionsChooser(item)}
            >
              <MaterialCommunityIcons name="navigation-variant" size={16} color={Colors.background} />
              <Text style={styles.cardActionText}>{t('map.directions')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardActionBtn, styles.cardActionOutline]}
              onPress={() => router.push({ pathname: '/item/[type]/[id]', params: { type: item.kind, id: item.id } })}
            >
              <MaterialCommunityIcons name="file-document-outline" size={16} color={Colors.accent} />
              <Text style={[styles.cardActionText, { color: Colors.accent }]}>{t('map.details')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'halal' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
          contentContainerStyle={styles.filterContent}
        >
          {CATEGORY_FILTERS.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[styles.chip, categoryFilter === cat.key && styles.chipActive]}
              onPress={() => setCategoryFilter(cat.key)}
            >
              {cat.key !== 'all' && (
                <View style={[styles.chipDot, { backgroundColor: CATEGORY_COLORS[cat.key as HalalPlace['category']] }]} />
              )}
              <Text style={[styles.chipText, categoryFilter === cat.key && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.content}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
            <ActivityIndicator color={Colors.accent} size="large" />
            <Text style={styles.loadingText}>{t('map.loading_map')}</Text>
          </View>
        )}

        {error && !loading && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
            <Text style={styles.errorText}>{t('errors.network')}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={loadData}>
              <Text style={styles.retryText}>{t('errors.retry')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {!error && (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={DEFAULT_REGION}
            showsUserLocation
            toolbarEnabled={false}
          >
            {activeTab === 'mosques' &&
              currentMosques.map((mosque) => (
                <Marker
                  key={mosque.id}
                  coordinate={{ latitude: mosque.lat, longitude: mosque.lng }}
                  onPress={() => focusItem(mosque)}
                >
                  <View style={styles.mosquePin}>
                    <MaterialCommunityIcons name="mosque" size={20} color={Colors.accent} />
                  </View>
                </Marker>
              ))}

            {activeTab === 'halal' &&
              currentHalal.map((place) => (
                <Marker
                  key={place.id}
                  coordinate={{ latitude: place.lat, longitude: place.lng }}
                  onPress={() => focusItem(place)}
                >
                  <View style={[styles.halalPin, { backgroundColor: CATEGORY_COLORS[place.category] }]} />
                </Marker>
              ))}

            {activeTab === 'butchers' &&
              butchers.map((place) => (
                <Marker
                  key={place.id}
                  coordinate={{ latitude: place.lat, longitude: place.lng }}
                  onPress={() => focusItem(place)}
                >
                  <View style={[styles.halalPin, { backgroundColor: CATEGORY_COLORS[place.category] }]} />
                </Marker>
              ))}
          </MapView>
        )}

        {!error && (
          cardsVisible && (
            <View style={[styles.cardRailWrap, { paddingBottom: insets.bottom + 12 }]}>
              <TouchableOpacity style={styles.cardRailClose} onPress={() => setCardsVisible(false)} accessibilityLabel={t('map.cancel')}>
                <MaterialCommunityIcons name="close" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
              <FlatList
                horizontal
                data={activeCards}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardRail}
                snapToAlignment="start"
                decelerationRate="fast"
                renderItem={({ item }) => renderCard(item)}
                ListEmptyComponent={
                  !loading ? (
                    <View style={styles.emptyContainer}>
                      <MaterialCommunityIcons name="storefront-outline" size={48} color={Colors.border} />
                      <Text style={styles.emptyText}>{t('map.no_locations')}</Text>
                    </View>
                  ) : null
                }
              />
            </View>
          )
        )}
      </View>

      <Modal transparent visible={!!directionsTarget} animationType="fade" onRequestClose={() => setDirectionsTarget(null)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setDirectionsTarget(null)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('map.choose_app')}</Text>
            <Text style={styles.modalSubtitle}>
              {directionsTarget ? directionsTarget.name : ''}
            </Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => openDirections('waze')}>
              <MaterialCommunityIcons name="navigation" size={18} color={Colors.accent} />
              <Text style={styles.modalOptionText}>{t('map.waze')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => openDirections('google')}>
              <MaterialCommunityIcons name="google-maps" size={18} color={Colors.accent} />
              <Text style={styles.modalOptionText}>{t('map.google_maps')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => openDirections('apple')}>
              <MaterialCommunityIcons name="map" size={18} color={Colors.accent} />
              <Text style={styles.modalOptionText}>{t('map.apple_maps')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, styles.modalCancel]} onPress={() => openDirections('native')}>
              <MaterialCommunityIcons name="map-marker-radius" size={18} color={Colors.accentSoft} />
              <Text style={[styles.modalOptionText, { color: Colors.accentSoft }]}>{t('map.native_maps')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalClose} onPress={() => setDirectionsTarget(null)}>
              <Text style={styles.modalCloseText}>{t('map.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    position: 'relative',
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.accent,
    fontWeight: '600',
  },

  filterBar: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
  },
  chipActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent + '22',
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.accent,
    fontWeight: '600',
  },

  map: {
    flex: 1,
  },
  mosquePin: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 999,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.accent,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  halalPin: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },

  cardRailWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardRailClose: {
    position: 'absolute',
    right: 16,
    top: -16,
    zIndex: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },
  cardRail: {
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 10,
  },
  card: {
    width: 290,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardSelected: {
    borderColor: Colors.accent,
    transform: [{ translateY: -2 }],
  },
  cardImage: {
    width: '100%',
    height: 132,
    backgroundColor: Colors.surfaceElevated,
  },
  cardImageFallback: {
    width: '100%',
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceElevated,
  },
  cardBody: {
    padding: 14,
    gap: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardTitleWrap: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  distancePill: {
    backgroundColor: Colors.accent + '22',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  distanceText: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  detailsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    opacity: 0.9,
  },
  jumuahRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  jumuahPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  jumuahPillLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  jumuahPillTime: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '800',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  cardActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 10,
  },
  cardActionOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  cardActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.background,
  },

  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background + 'CC',
    gap: 12,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  errorText: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.accent,
  },
  retryText: {
    color: Colors.background,
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
    gap: 12,
    width: 240,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 16,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.surfaceElevated,
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modalCancel: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalClose: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalCloseText: {
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
