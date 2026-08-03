import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { HalalPlaceResult } from '../HalalPlacesScreen.types';
import { isOpenNow } from '../HalalPlacesScreen.utils';
import { createOpenStyle, styles } from './HalalPlaceCard.styles';

interface Props { item: HalalPlaceResult; onPress: () => void; t: TFunction }
type FoodMetaProps = Pick<Props, 'item' | 't'>;

export function HalalPlaceCard({ item, onPress, t }: Props) {
  const open = isOpenNow(item.hours);
  return (
    <TouchableOpacity
      style={[styles.card, item.discountPercent ? styles.cardOffer : null]}
      activeOpacity={0.84}
      onPress={onPress}
    >
      {!!item.discountPercent && <View style={styles.offerRail} />}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imageFallback}>
          <MaterialCommunityIcons name="storefront-outline" size={30} color={Colors.accent} />
        </View>
      )}
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          {!!item.discountPercent && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{t('map.discount_off', { discount: item.discountPercent })}</Text>
            </View>
          )}
        </View>
        <Text style={styles.type}>{t(`map.${item.category}`)}</Text>
        <View style={styles.addressRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color={Colors.accent} />
          <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.distance}>{t('map.distance', { km: item.distanceKm.toFixed(1) })}</Text>
          {open !== null && <Text style={[styles.open, createOpenStyle(open)]}>{open ? t('map.open_now') : t('map.closed')}</Text>}
        </View>
        <FoodMeta item={item} t={t} />
        {!!item.promoCode && <Text style={styles.promo}>{t('map.promo_code', { code: item.promoCode })}</Text>}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.border} />
    </TouchableOpacity>
  );
}

function FoodMeta({ item, t }: FoodMetaProps) {
  if (!item.foodCategories?.length && item.averageMealCost == null) return null;
  return (
    <View style={styles.foodMeta}>
      {!!item.foodCategories?.length && <Text style={styles.foodCategories} numberOfLines={1}>{item.foodCategories.slice(0, 3).join(' • ')}</Text>}
      {item.averageMealCost != null && <Text style={styles.price}>{t('map.average_for_one', { price: item.averageMealCost.toFixed(0) })}</Text>}
    </View>
  );
}
