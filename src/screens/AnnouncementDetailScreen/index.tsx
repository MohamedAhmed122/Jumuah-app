import { ScrollView, View } from 'react-native';
import { AnnouncementBody } from './components/AnnouncementBody';
import { AnnouncementHero } from './components/AnnouncementHero';
import { AnnouncementLocation } from './components/AnnouncementLocation';
import { AnnouncementMetadata } from './components/AnnouncementMetadata';
import { AnnouncementNavigation } from './components/AnnouncementNavigation';
import { AnnouncementState } from './components/AnnouncementState';
import { useAnnouncementDetailScreen } from './hooks/AnnouncementDetailScreen.hooks';
import { createScreenStyles, styles } from './AnnouncementDetailScreen.styles';

export default function AnnouncementDetailScreen() {
  const screen = useAnnouncementDetailScreen();
  const { data, actions, insets, t } = screen;
  const dynamicStyles = createScreenStyles(insets.top, insets.bottom);
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <AnnouncementNavigation canShare={!!data.announcement} onBack={actions.goBack} onShare={actions.share} />
      {data.loading && <AnnouncementState type="loading" onBack={actions.goBack} t={t} />}
      {data.error && !data.loading && <AnnouncementState type="error" onBack={actions.goBack} t={t} />}
      {!!data.announcement && !data.loading && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={dynamicStyles.scroll}>
          <AnnouncementHero image={data.announcement.image} />
          <View style={styles.content}>
            <AnnouncementMetadata announcement={data.announcement} t={t} />
            <AnnouncementLocation
              locationType={data.announcement.locationType}
              outsideAddress={data.announcement.outsideLocation?.address}
              mosqueName={data.locationName}
              endDate={screen.formattedEndDate}
              t={t}
            />
            <AnnouncementBody paragraphs={screen.paragraphs} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
