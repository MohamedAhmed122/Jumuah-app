import { ScrollView, Text, View } from 'react-native';
import { AnnouncementNavigation } from '@src/screens/AnnouncementDetailScreen/components/AnnouncementNavigation';
import { AnnouncementState } from '@src/screens/AnnouncementDetailScreen/components/AnnouncementState';
import { EventAttendance } from './components/EventAttendance';
import { EventHero } from './components/EventHero';
import { EventMetadata } from './components/EventMetadata';
import { createEventScreenStyles, styles } from './EventDetailScreen.styles';
import { useEventDetailScreen } from './hooks/EventDetailScreen.hooks';

export default function EventDetailScreen() {
  const screen = useEventDetailScreen();
  const { data, t } = screen;
  const dynamicStyles = createEventScreenStyles(screen.insets.top, screen.insets.bottom);
  const location = data.event?.locationType === 'outside' ? data.event.outsideLocation?.address ?? '' : data.mosqueName;
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <AnnouncementNavigation canShare={false} onBack={screen.goBack} onShare={() => undefined} />
      {data.loading && <AnnouncementState type="loading" onBack={screen.goBack} t={t} />}
      {data.error && !data.event && !data.loading && <AnnouncementState type="error" onBack={screen.goBack} t={t} />}
      {!!data.event && !data.loading && <ScrollView contentContainerStyle={dynamicStyles.scroll} showsVerticalScrollIndicator={false}>
        <EventHero image={data.event.image} />
        <View style={styles.content}>
          <EventMetadata event={data.event} location={location} />
          <EventAttendance event={data.event} state={screen.attendance} updating={data.updating} onJoin={data.join} onLeave={data.leave} t={t} />
          <View style={styles.divider} />
          {screen.paragraphs.map((paragraph, index) => <Text key={index} style={styles.paragraph}>{paragraph}</Text>)}
        </View>
      </ScrollView>}
    </View>
  );
}
