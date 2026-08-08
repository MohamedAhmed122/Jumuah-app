import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { htmlToPlainText, isOpenNow } from '../ItemDetailScreen.utils';
import { useItemActions } from './useItemActions';
import { useItemDetailData } from './useItemDetailData';

export function useItemDetailScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useItemDetailData();
  const actions = useItemActions(data.item);
  return {
    t,
    insets,
    data,
    actions,
    description: data.halalPlace ? htmlToPlainText(data.halalPlace.descriptionHtml) : null,
    openStatus: data.halalPlace ? isOpenNow(data.halalPlace.hours) : null,
  };
}
