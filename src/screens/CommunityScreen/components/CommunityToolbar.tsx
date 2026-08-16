import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import { Colors } from '@constants/Colors';
import type { CommunityTab } from '../CommunityScreen.types';
import { styles } from './CommunityToolbar.styles';

interface Props { activeTab: CommunityTab; mosqueCount: number; onTabChange: (tab: CommunityTab) => void; onFilter: () => void; showAnnouncements: boolean; showEvents: boolean; t: TFunction }

export function CommunityToolbar({ activeTab, mosqueCount, onTabChange, onFilter, showAnnouncements, showEvents, t }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {showAnnouncements && <Tab active={activeTab === 'announcements'} label={t('community.announcements')} onPress={() => onTabChange('announcements')} />}
        {showEvents && <Tab active={activeTab === 'events'} label={t('community.events')} onPress={() => onTabChange('events')} />}
      </View>
      <TouchableOpacity style={styles.filter} onPress={onFilter} accessibilityLabel={t('community.select_mosques')}>
        <MaterialCommunityIcons name="mosque" size={17} color={Colors.accent} />
        <Text style={styles.count}>{mosqueCount}</Text>
        <MaterialCommunityIcons name="chevron-down" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

function Tab({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return <TouchableOpacity style={[styles.tab, active && styles.tabActive]} onPress={onPress}><Text style={[styles.tabText, active && styles.tabTextActive]} numberOfLines={1}>{label}</Text></TouchableOpacity>;
}
