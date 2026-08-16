import type { AgendaEntry, AgendaSchedule } from 'react-native-calendars';

export type AgendaItemType = 'announcement' | 'event';
export type CommunityAgendaRouteParams = { mosqueIds: string };

export interface CommunityAgendaItem extends AgendaEntry {
  id: string;
  mosqueId: string;
  mosqueIds: string[];
  time?: string;
  title: string;
  type: AgendaItemType;
}

export interface CommunityAgendaSchedule extends AgendaSchedule {
  [date: string]: CommunityAgendaItem[];
}

export interface CommunityAgendaSection {
  data: CommunityAgendaItem[];
  title: string;
}

export type CommunityAgendaMarks = Record<string, {
  dots: { key: AgendaItemType; color: string }[];
}>;
