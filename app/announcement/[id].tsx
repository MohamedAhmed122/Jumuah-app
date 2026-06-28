import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@constants/Colors';
import {
  announcementPlainText,
  fetchAnnouncementById,
  readCachedAnnouncements,
  type Announcement,
} from '@src/api/announcements';
import { fetchLocationBundle } from '@src/api/locations';
import { useSettingsStore } from '@src/stores/settingsStore';

const SCREEN_WIDTH = Dimensions.get('window').width;

function formatDate(dateStr: string) {
  try {
    return format(new Date(dateStr), 'd MMMM yyyy');
  } catch {
    return dateStr;
  }
}

export default function AnnouncementDetailScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { preferredMosqueId, appLanguage } = useSettingsStore();

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !preferredMosqueId) {
      setLoading(false);
      setError(true);
      return;
    }

    (async () => {
      let resolved: Announcement | null = null;
      try {
        const res = await fetchAnnouncementById(id, preferredMosqueId, appLanguage);
        resolved = res.data;
      } catch {
        // Fall back to feed cache
        const cached = await readCachedAnnouncements(preferredMosqueId, appLanguage);
        const found = cached?.find((a) => a.id === id) ?? null;
        if (found) {
          resolved = found;
        } else {
          setError(true);
        }
      } finally {
        setAnnouncement(resolved);
        if (resolved?.locationType === 'mosque') {
          try {
            const locations = await fetchLocationBundle();
            const locationId = resolved.locationMosqueId ?? preferredMosqueId;
            setLocationName(locations.mosques.find((mosque) => mosque.id === locationId)?.name ?? '');
          } catch {
            // Use the localized generic mosque label when metadata is unavailable.
          }
        }
        setLoading(false);
      }
    })();
  }, [id, preferredMosqueId, appLanguage]);

  const handleShare = async () => {
    if (!announcement) return;
    try {
      await Share.share({
        title: announcement.title,
        message: `${announcement.title}\n\n${announcementPlainText(announcement.descriptionHtml)}`,
      });
    } catch {
      // user dismissed share sheet
    }
  };

  const bodyParagraphs = announcement?.descriptionHtml
    ? announcementPlainText(announcement.descriptionHtml)
    .split(/\n\n+/)
    .map((p) => p.trim())
      .filter(Boolean)
    : [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Nav bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        {announcement && (
          <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
            <MaterialCommunityIcons name="share-variant" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} size="large" />
        </View>
      )}

      {/* Error */}
      {error && !loading && (
        <View style={styles.centered}>
          <MaterialCommunityIcons name="wifi-off" size={44} color={Colors.textSecondary} />
          <Text style={styles.errorText}>{t('errors.network')}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
            <Text style={styles.retryText}>← {t('community.announcements')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {announcement && !loading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        >
          {/* Hero thumbnail */}
          {announcement.image ? (
            <Image
              source={{ uri: announcement.image }}
              style={styles.hero}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <MaterialCommunityIcons name="bulletin-board" size={48} color={Colors.border} />
            </View>
          )}

          <View style={styles.content}>
            {/* Date row */}
            <View style={styles.dateRow}>
              {announcement.isPinned && (
                <View style={styles.pinnedBadge}>
                  <MaterialCommunityIcons name="pin" size={12} color={Colors.background} />
                  <Text style={styles.pinnedBadgeText}>{t('community.pinned')}</Text>
                </View>
              )}
              <Text style={styles.dateText}>{formatDate(announcement.date)}</Text>
              {announcement.eventDate && (
                <View style={styles.eventBadge}>
                  <MaterialCommunityIcons name="calendar-star" size={12} color={Colors.accent} />
                  <Text style={styles.eventBadgeText}>
                    {t('community.event_date', { date: formatDate(announcement.eventDate) })}
                  </Text>
                </View>
              )}
            </View>

            {/* Title */}
            <Text style={styles.title}>{announcement.title}</Text>

            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name={announcement.locationType === 'outside' ? 'map-marker-outline' : 'mosque'}
                size={18}
                color={Colors.accentSoft}
              />
              <Text style={styles.locationText}>
                {announcement.locationType === 'outside'
                  ? announcement.outsideLocation?.address
                  : locationName || t('community.at_mosque')}
              </Text>
            </View>

            {announcement.endDate && (
              <Text style={styles.endDate}>
                {t('community.ends_on', { date: formatDate(announcement.endDate) })}
              </Text>
            )}

            <View style={styles.divider} />

            {/* Body paragraphs */}
            {bodyParagraphs.map((para, idx) => (
              <Text key={idx} style={styles.bodyPara}>
                {para}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Nav bar
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navBtn: {
    padding: 8,
    borderRadius: 8,
  },

  // States
  centered: {
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
    marginTop: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retryText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },

  // Hero
  hero: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * (9 / 16),
  },
  heroPlaceholder: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * (9 / 16),
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Content
  content: {
    padding: 20,
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent + '22',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  eventBadgeText: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '600',
  },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pinnedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.background,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locationText: { flex: 1, fontSize: 14, color: Colors.accentSoft, lineHeight: 20 },
  endDate: { fontSize: 12, color: Colors.textSecondary },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  bodyPara: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Gallery
  galleryContainer: {
    marginTop: 8,
    marginHorizontal: -20,
  },
  gallery: {
    paddingHorizontal: 20,
    gap: 10,
  },
  galleryImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7 * (9 / 16),
    borderRadius: 10,
  },
});
