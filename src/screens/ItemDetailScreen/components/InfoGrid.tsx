import { View } from 'react-native';
import type { DetailItem } from '../ItemDetailScreen.types';
import type { HalalPlace } from '@src/api/locations';
import { InfoRow } from './InfoRow';
import { styles } from './InfoGrid.styles';

interface Props { item: DetailItem; halalPlace: HalalPlace | null }

export function InfoGrid({ item, halalPlace }: Props) {
  return (
    <View style={styles.grid}>
      {!!item.phone && <InfoRow icon="phone-outline" label={item.phone} />}
      {!!item.hours && <InfoRow icon="clock-outline" label={item.hours} />}
      <InfoRow icon="map-marker-outline" label={`${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}`} />
      {!!halalPlace?.city && (
        <InfoRow icon="city-variant-outline" label={`${halalPlace.city}, ${halalPlace.country || 'Lithuania'}`} />
      )}
    </View>
  );
}
