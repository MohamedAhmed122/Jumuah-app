import { Share } from 'react-native';
import { router } from 'expo-router';
import { announcementPlainText, type Announcement } from '@src/api/announcements';

export function useAnnouncementActions(announcement: Announcement | null) {
  const share = async () => {
    if (!announcement) return;
    try {
      await Share.share({
        title: announcement.title,
        message: `${announcement.title}\n\n${announcementPlainText(announcement.descriptionHtml)}`,
      });
    } catch {
      return;
    }
  };
  return { goBack: router.back, share };
}
