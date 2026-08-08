import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatAnnouncementDate, getAnnouncementParagraphs } from '../AnnouncementDetailScreen.utils';
import { useAnnouncementActions } from './useAnnouncementActions';
import { useAnnouncementDetailData } from './useAnnouncementDetailData';

export function useAnnouncementDetailScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useAnnouncementDetailData();
  const actions = useAnnouncementActions(data.announcement);
  return {
    t,
    insets,
    data,
    actions,
    paragraphs: getAnnouncementParagraphs(data.announcement?.descriptionHtml),
    formattedEndDate: data.announcement?.endDate
      ? formatAnnouncementDate(data.announcement.endDate)
      : undefined,
  };
}
