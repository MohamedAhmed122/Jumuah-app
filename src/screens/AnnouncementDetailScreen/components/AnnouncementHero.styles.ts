import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { HERO_HEIGHT, HERO_WIDTH } from '../AnnouncementDetailScreen.constants';

export const styles = StyleSheet.create({
  hero: { width: HERO_WIDTH, height: HERO_HEIGHT },
  placeholder: {
    width: HERO_WIDTH, height: HERO_HEIGHT, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
});
