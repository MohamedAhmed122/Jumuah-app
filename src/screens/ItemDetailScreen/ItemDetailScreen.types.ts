import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HalalPlace, Mosque } from '@src/api/locations';

export type ItemType = 'mosque' | 'halal';
export type DetailItem = Mosque | HalalPlace;
export type DetailIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type ItemDetailRouteParams = {
  type: ItemType;
  id: string;
};

export interface ItemDetailData {
  item: DetailItem | null;
  mosque: Mosque | null;
  halalPlace: HalalPlace | null;
  type: ItemType | undefined;
  loading: boolean;
  error: boolean;
}
