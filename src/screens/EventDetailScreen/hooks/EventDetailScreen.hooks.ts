import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { attendanceState, eventParagraphs } from '../EventDetailScreen.utils';
import { useEventDetailData } from './useEventDetailData';

export function useEventDetailScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const data = useEventDetailData();
  return {
    t, insets, data, goBack: router.back,
    paragraphs: eventParagraphs(data.event?.descriptionHtml),
    attendance: data.event ? attendanceState(data.event) : 'disabled' as const,
  };
}
