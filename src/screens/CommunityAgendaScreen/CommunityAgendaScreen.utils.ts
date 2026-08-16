import { format, isValid } from 'date-fns';
import type { Announcement } from '@src/api/announcements';
import type { CommunityEvent } from '@src/api/events';
import { AGENDA_COLORS } from './CommunityAgendaScreen.constants';
import type { CommunityAgendaItem, CommunityAgendaMarks, CommunityAgendaSchedule } from './CommunityAgendaScreen.types';

export function buildAgenda(announcements: Announcement[], events: CommunityEvent[]) {
  const schedule: CommunityAgendaSchedule = {};
  announcements.forEach((item) => addItem(schedule, item.eventDate ?? item.date, {
    id: item.id, name: item.title, title: item.title, height: 92, day: item.eventDate ?? item.date,
    mosqueId: item.mosqueIds[0], mosqueIds: item.mosqueIds, type: 'announcement',
    time: item.eventDate ? displayTime(item.eventDate) : undefined,
  }));
  events.forEach((item) => addItem(schedule, item.eventDate, {
    id: item.id, name: item.title, title: item.title, height: 92, day: item.eventDate,
    mosqueId: item.mosqueIds[0], mosqueIds: item.mosqueIds, type: 'event', time: displayTime(item.eventDate),
  }));
  Object.values(schedule).forEach((items) => items.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? '')));
  const sections = Object.entries(schedule).sort(([first], [second]) => first.localeCompare(second))
    .map(([title, data]) => ({ title, data }));
  return { sections, marks: buildMarks(schedule) };
}

function addItem(schedule: CommunityAgendaSchedule, value: string, item: CommunityAgendaItem) {
  const date = new Date(value);
  if (!isValid(date)) return;
  const key = format(date, 'yyyy-MM-dd');
  if (!schedule[key]) schedule[key] = [];
  schedule[key].push(item);
}

function displayTime(value: string) {
  const date = new Date(value);
  return isValid(date) ? format(date, 'HH:mm') : undefined;
}

function buildMarks(schedule: CommunityAgendaSchedule): CommunityAgendaMarks {
  return Object.fromEntries(Object.entries(schedule).filter(([, items]) => items.length).map(([date, items]) => {
    const types = [...new Set(items.map((item) => item.type))];
    return [date, { dots: types.map((type) => ({ key: type, color: AGENDA_COLORS[type] })) }];
  }));
}
