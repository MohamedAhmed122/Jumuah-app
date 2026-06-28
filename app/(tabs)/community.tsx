import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@constants/Colors';
import {
  announcementPlainText,
  fetchAnnouncementsCached,
  type Announcement,
} from '@src/api/announcements';
import { fetchLocationBundle } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

function displayDate(value: string): string {
  try {
    return format(new Date(value), 'd MMM yyyy');
  } catch {
    return value;
  }
}

function AnnouncementCard({
  item,
  locationName,
  onPress,
}: {
  item: Announcement;
  locationName?: string;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const preview = announcementPlainText(item.descriptionHtml);
  const location = item.locationType === 'outside'
    ? item.outsideLocation?.address
    : locationName || t('community.at_mosque');

  return (
    <TouchableOpacity
      style={[styles.card, item.isPinned && styles.cardPinned]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      {item.isPinned && <View style={styles.pinRail} />}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <MaterialCommunityIcons name="bulletin-board" size={32} color={Colors.border} />
        </View>
      )}

      <View style={styles.cardBody}>
        <View style={styles.cardMeta}>
          {item.isPinned && (
            <View style={styles.pinnedBadge}>
              <MaterialCommunityIcons name="pin" size={11} color={Colors.background} />
              <Text style={styles.pinnedBadgeText}>{t('community.pinned')}</Text>
            </View>
          )}
          <Text style={styles.dateText}>{displayDate(item.date)}</Text>
          {item.eventDate && (
            <View style={styles.eventBadge}>
              <MaterialCommunityIcons name="calendar-star" size={11} color={Colors.accent} />
              <Text style={styles.eventBadgeText}>
                {t('community.event_date', { date: displayDate(item.eventDate) })}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{preview}</Text>
        {location && (
          <View style={styles.locationRow}>
            <MaterialCommunityIcons
              name={item.locationType === 'outside' ? 'map-marker-outline' : 'mosque'}
              size={14}
              color={Colors.accentSoft}
            />
            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function CommunityScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { preferredMosqueId, appLanguage } = useSettingsStore();
  const [mosqueName, setMosqueName] = useState('');
  const [mosqueNames, setMosqueNames] = useState<Record<string, string>>({});
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const loadData = useCallback(async (forceRefresh = false) => {
    if (!preferredMosqueId) {
      setAnnouncements([]);
      setMosqueName('');
      setError(false);
      setFromCache(false);
      return;
    }

    try {
      setError(false);
      const result = await fetchAnnouncementsCached(preferredMosqueId, appLanguage, forceRefresh);
      setAnnouncements(result.announcements);
      setFromCache(result.fromCache);
      try {
        const locations = await fetchLocationBundle(forceRefresh);
        setMosqueNames(Object.fromEntries(locations.mosques.map((mosque) => [mosque.id, mosque.name])));
        setMosqueName(locations.mosques.find((mosque) => mosque.id === preferredMosqueId)?.name ?? '');
      } catch {
        // The feed can still render when mosque metadata is temporarily unavailable.
      }
    } catch {
      setError(true);
    }
  }, [preferredMosqueId, appLanguage]);

  useEffect(() => {
    setLoading(true);
    void loadData(false).finally(() => setLoading(false));
  }, [loadData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(true);
    setRefreshing(false);
  }, [loadData]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('community.announcements')}</Text>
        {!!mosqueName && <Text style={styles.headerMosque}>{mosqueName}</Text>}
      </View>

      {fromCache && (
        <View style={styles.offlineBanner}>
          <MaterialCommunityIcons name="wifi-off" size={14} color={Colors.textSecondary} />
          <Text style={styles.offlineBannerText}>{t('community.cached_notice')}</Text>
        </View>
      )}

      {!preferredMosqueId ? (
        <View style={styles.centered}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="mosque" size={38} color={Colors.accent} />
          </View>
          <Text style={styles.emptyTitle}>{t('community.select_mosque_title')}</Text>
          <Text style={styles.emptyText}>{t('community.select_mosque_body')}</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(tabs)/settings')}>
            <Text style={styles.primaryBtnText}>{t('community.select_mosque_action')}</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} size="large" />
          <Text style={styles.loadingText}>{t('community.loading')}</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
          <Text style={styles.errorText}>{t('errors.network')}</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => loadData(true)}>
            <Text style={styles.primaryBtnText}>{t('errors.retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.accent}
              colors={[Colors.accent]}
            />
          )}
          ListEmptyComponent={(
            <View style={styles.centeredList}>
              <MaterialCommunityIcons name="bulletin-board" size={48} color={Colors.border} />
              <Text style={styles.emptyText}>{t('community.no_posts')}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <AnnouncementCard
              item={item}
              locationName={item.locationMosqueId ? mosqueNames[item.locationMosqueId] : mosqueName}
              onPress={() => router.push(`/announcement/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.surface, paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  headerMosque: { marginTop: 3, fontSize: 12, color: Colors.accentSoft },
  offlineBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.surfaceElevated, paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  offlineBannerText: { fontSize: 12, color: Colors.textSecondary },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  centeredList: { alignItems: 'center', justifyContent: 'center', gap: 12, padding: 48 },
  loadingText: { color: Colors.textSecondary, fontSize: 14 },
  errorText: { color: Colors.textSecondary, fontSize: 15, textAlign: 'center' },
  emptyIcon: {
    width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.accent + '18', borderWidth: 1, borderColor: Colors.accent + '44',
  },
  emptyTitle: { fontSize: 19, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  emptyText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  primaryBtn: { marginTop: 4, paddingHorizontal: 24, paddingVertical: 11, borderRadius: 20, backgroundColor: Colors.accent },
  primaryBtnText: { color: Colors.background, fontWeight: '700', fontSize: 14 },
  listContent: { padding: 16, gap: 14, flexGrow: 1 },
  card: {
    position: 'relative', backgroundColor: Colors.surface, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  cardPinned: { borderColor: Colors.accent + '88' },
  pinRail: { position: 'absolute', zIndex: 2, top: 0, bottom: 0, left: 0, width: 3, backgroundColor: Colors.accent },
  thumbnail: { width: '100%', aspectRatio: 16 / 9 },
  thumbnailPlaceholder: {
    width: '100%', aspectRatio: 16 / 9, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  cardBody: { padding: 14, gap: 7 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  dateText: { fontSize: 12, color: Colors.textSecondary },
  pinnedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.accent,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  pinnedBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.background, textTransform: 'uppercase' },
  eventBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.accent + '22',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  eventBadgeText: { fontSize: 11, color: Colors.accent, fontWeight: '600' },
  cardTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, lineHeight: 23 },
  cardDescription: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  locationText: { flex: 1, fontSize: 12, color: Colors.accentSoft },
});
