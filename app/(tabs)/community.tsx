import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@constants/Colors';
import {
  fetchAnnouncementsCached,
  type Announcement,
} from '@src/api/announcements';

// ─── Card ────────────────────────────────────────────────────────────────────

function AnnouncementCard({
  item,
  onPress,
}: {
  item: Announcement;
  onPress: () => void;
}) {
  const { t } = useTranslation();

  const dateStr = (() => {
    try {
      return format(new Date(item.date), 'd MMM yyyy');
    } catch {
      return item.date;
    }
  })();

  const eventDateStr = item.eventDate
    ? (() => {
        try {
          return format(new Date(item.eventDate), 'd MMM yyyy');
        } catch {
          return item.eventDate;
        }
      })()
    : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <MaterialCommunityIcons name="bulletin-board" size={32} color={Colors.border} />
        </View>
      )}

      <View style={styles.cardBody}>
        <View style={styles.cardMeta}>
          <Text style={styles.dateText}>{dateStr}</Text>
          {eventDateStr && (
            <View style={styles.eventBadge}>
              <MaterialCommunityIcons name="calendar-star" size={11} color={Colors.accent} />
              <Text style={styles.eventBadgeText}>
                {t('community.event_date', { date: eventDateStr })}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardExcerpt} numberOfLines={2}>
          {item.excerpt}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function CommunityScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const loadData = useCallback(async (forceRefresh = false) => {
    try {
      setError(false);
      const result = await fetchAnnouncementsCached(forceRefresh);
      setAnnouncements(result.announcements);
      setFromCache(result.fromCache);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    loadData(false).finally(() => setLoading(false));
  }, [loadData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData(true);
    setRefreshing(false);
  }, [loadData]);

  const handleCardPress = (id: string) => {
    router.push(`/announcement/${id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('community.announcements')}</Text>
      </View>

      {/* Offline banner */}
      {fromCache && (
        <View style={styles.offlineBanner}>
          <MaterialCommunityIcons name="wifi-off" size={14} color={Colors.textSecondary} />
          <Text style={styles.offlineBannerText}>{t('community.cached_notice')}</Text>
        </View>
      )}

      {/* Loading state */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} size="large" />
          <Text style={styles.loadingText}>{t('community.loading')}</Text>
        </View>
      )}

      {/* Error state — no cache at all */}
      {error && !loading && (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
          <Text style={styles.errorText}>{t('errors.network')}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => loadData(true)}>
            <Text style={styles.retryText}>{t('errors.retry')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Feed */}
      {!loading && !error && (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.accent}
              colors={[Colors.accent]}
            />
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <MaterialCommunityIcons
                name="bulletin-board"
                size={48}
                color={Colors.border}
              />
              <Text style={styles.emptyText}>{t('community.no_posts')}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <AnnouncementCard item={item} onPress={() => handleCardPress(item.id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Offline banner
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  offlineBannerText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // States
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: Colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 4,
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
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },

  // List
  listContent: {
    padding: 16,
    gap: 12,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  thumbnailPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 14,
    gap: 6,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent + '22',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  eventBadgeText: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  cardExcerpt: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
});
