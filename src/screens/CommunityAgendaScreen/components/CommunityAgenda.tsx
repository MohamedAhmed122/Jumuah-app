import { format } from 'date-fns';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import type { TFunction } from 'i18next';
import { useThemeColors, useThemedStyles } from '@src/hooks/useTheme';
import { createAgendaTheme } from '../CommunityAgendaScreen.constants';
import type { CommunityAgendaItem, CommunityAgendaMarks, CommunityAgendaSection } from '../CommunityAgendaScreen.types';
import { CommunityAgendaCard } from './CommunityAgendaCard';
import { CommunityAgendaEmpty } from './CommunityAgendaEmpty';
import { themedStyles } from './CommunityAgenda.styles';

interface Props { sections: CommunityAgendaSection[]; marks: CommunityAgendaMarks; onOpen: (item: CommunityAgendaItem) => void; t: TFunction }

export function CommunityAgenda({ sections, marks, onOpen, t }: Props) {
  const styles = useThemedStyles(themedStyles);
  const agendaTheme = createAgendaTheme(useThemeColors());
  return (
    <CalendarProvider date={format(new Date(), 'yyyy-MM-dd')} showTodayButton todayBottomMargin={18} todayButtonStyle={styles.todayButton} theme={agendaTheme} style={styles.provider}>
      <WeekCalendar style={styles.week} firstDay={1} markedDates={marks} markingType="multi-dot" theme={agendaTheme} allowShadow={false} />
      <AgendaList
        sections={sections}
        renderItem={({ item, index }) => <CommunityAgendaCard item={item} first={index === 0} onPress={() => onOpen(item)} t={t} />}
        renderSectionFooter={() => <View style={styles.sectionGap} />}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        theme={agendaTheme}
        sectionStyle={styles.section}
        contentContainerStyle={styles.content}
        viewOffset={92}
        ListEmptyComponent={<CommunityAgendaEmpty t={t} />}
        scrollToNextEvent
      />
    </CalendarProvider>
  );
}
