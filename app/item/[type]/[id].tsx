import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@constants/Colors';
import { fetchLocationBundle, type HalalPlace, type Mosque } from '@src/api/locations';

type ItemType = 'mosque' | 'halal';
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

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

function isOpenNow(hours?: string): boolean | null {
  if (!hours) return null;
  const match = hours.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, oh, om, ch, cm] = match.map(Number);
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= oh * 60 + om && cur < ch * 60 + cm;
}

function buildDirectionsUrl(lat: number, lng: number, name: string) {
  const encoded = encodeURIComponent(name);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&dir_action=navigate&query=${encoded}`;
}

export default function ItemDetailScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { type, id } = useLocalSearchParams<{ type: ItemType; id: string }>();

  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [halal, setHalal] = useState<HalalPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !type) return;

    (async () => {
      try {
        const bundle = await fetchLocationBundle();
        setMosques(bundle.mosques);
        setHalal(bundle.halal);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type]);

  const item = useMemo(() => {
    if (!id || !type) return null;
    if (type === 'mosque') return mosques.find((entry) => entry.id === id) ?? null;
    return halal.find((entry) => entry.id === id) ?? null;
  }, [id, type, mosques, halal]);

  const handleShare = async () => {
    if (!item) return;
    const address = item.address;
    try {
      await Share.share({
        title: item.name,
        message: `${item.name}\n${address}`,
      });
    } catch {
      // user dismissed the sheet
    }
  };

  const openDirections = async () => {
    if (!item) return;
    const url = buildDirectionsUrl(item.lat, item.lng, item.name);
    await Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color={Colors.accent} size="large" />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <MaterialCommunityIcons name="map-marker-alert-outline" size={44} color={Colors.textSecondary} />
        <Text style={styles.errorText}>{t('errors.api_failed')}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
          <Text style={styles.retryText}>{t('errors.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const mosqueItem = type === 'mosque' ? (item as Mosque) : null;
  const halalItem = type === 'halal' ? (item as HalalPlace) : null;
  const description = halalItem ? htmlToPlainText(halalItem.descriptionHtml) : null;
  const openStatus = halalItem ? isOpenNow(halalItem.hours) : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
          <MaterialCommunityIcons name="share-variant" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={styles.heroPlaceholder}>
            <MaterialCommunityIcons
              name={type === 'mosque' ? 'mosque' : 'storefront-outline'}
              size={56}
              color={Colors.border}
            />
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.address}</Text>
            </View>
            {type === 'halal' && openStatus !== null && (
              <View style={[styles.statusPill, { backgroundColor: openStatus ? Colors.accent + '22' : Colors.error + '22' }]}>
                <Text style={[styles.statusText, { color: openStatus ? Colors.accent : Colors.error }]}>
                  {openStatus ? t('map.open_now') : t('map.closed')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.infoGrid}>
            {item.phone ? (
              <InfoRow icon="phone-outline" label={item.phone} />
            ) : null}
            {item.hours ? (
              <InfoRow icon="clock-outline" label={item.hours} />
            ) : null}
            <InfoRow icon="map-marker-outline" label={`${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}`} />
            {halalItem && halalItem.city ? <InfoRow icon="city-variant-outline" label={halalItem.city} /> : null}
          </View>

          {mosqueItem && (mosqueItem.jumuahTimes?.first || mosqueItem.jumuahTimes?.second) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('map.jumuah_first')}</Text>
              <View style={styles.jumuahRow}>
                {mosqueItem.jumuahTimes?.first ? (
                  <View style={styles.jumuahPill}>
                    <Text style={styles.jumuahLabel}>{t('map.jumuah_first')}</Text>
                    <Text style={styles.jumuahTime}>{mosqueItem.jumuahTimes.first}</Text>
                  </View>
                ) : null}
                {mosqueItem.jumuahTimes?.second ? (
                  <View style={styles.jumuahPill}>
                    <Text style={styles.jumuahLabel}>{t('map.jumuah_second')}</Text>
                    <Text style={styles.jumuahTime}>{mosqueItem.jumuahTimes.second}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          )}

          {halalItem && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('map.details')}</Text>
              <Text style={styles.bodyText}>{description || t('map.no_details')}</Text>
              <View style={styles.categoryRow}>
                <Text style={styles.categoryLabel}>{t(`map.${halalItem.category}`)}</Text>
              </View>
            </View>
          )}

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryBtn} onPress={openDirections}>
              <MaterialCommunityIcons name="navigation-variant" size={18} color={Colors.background} />
              <Text style={styles.primaryBtnText}>{t('map.directions')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name={icon} size={18} color={Colors.accent} />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  hero: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.surfaceElevated,
  },
  heroPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  infoGrid: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryLabel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.accent + '22',
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  jumuahRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  jumuahPill: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 130,
  },
  jumuahLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  jumuahTime: {
    marginTop: 4,
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  actionRow: {
    marginTop: 4,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.accent,
  },
  primaryBtnText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
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
});
