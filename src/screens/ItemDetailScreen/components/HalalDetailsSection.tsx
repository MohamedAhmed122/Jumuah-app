import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { HalalPlace } from '@src/api/locations';
import { Colors } from '@constants/Colors';
import { styles } from './HalalDetailsSection.styles';

interface Props { place: HalalPlace | null; description: string | null; t: TFunction }

export function HalalDetailsSection({ place, description, t }: Props) {
  if (!place) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{t('map.details')}</Text>
      {!!place.discountPercent && <Offer place={place} t={t} />}
      <Text style={styles.body}>{description || t('map.no_details')}</Text>
      <View style={styles.categories}>
        <Text style={styles.category}>{t(`map.${place.category}`)}</Text>
        {(place.foodCategories ?? []).map((category) => (
          <Text style={styles.category} key={category}>{category}</Text>
        ))}
      </View>
      {place.averageMealCost != null && (
        <View style={styles.price}>
          <MaterialCommunityIcons name="account-cash-outline" size={21} color={Colors.accent} />
          <Text style={styles.priceValue}>{t('map.average_for_one', { price: place.averageMealCost.toFixed(0) })}</Text>
        </View>
      )}
    </View>
  );
}

function Offer({ place, t }: { place: HalalPlace; t: TFunction }) {
  return (
    <View style={styles.offer}>
      <MaterialCommunityIcons name="sale" size={24} color={Colors.background} />
      <View style={styles.offerText}>
        <Text style={styles.offerTitle}>{t('map.discount_off', { discount: place.discountPercent })}</Text>
        {!!place.promoCode && <Text style={styles.offerCode}>{t('map.promo_code', { code: place.promoCode })}</Text>}
      </View>
    </View>
  );
}
