import { View } from 'react-native';
import { CommunityState } from '@src/screens/CommunityScreen/components/CommunityState';
import { CommunityAgenda } from './components/CommunityAgenda';
import { CommunityAgendaHeader } from './components/CommunityAgendaHeader';
import { createAgendaInset, styles } from './CommunityAgendaScreen.styles';
import { useCommunityAgendaScreen } from './hooks/CommunityAgendaScreen.hooks';

export default function CommunityAgendaScreen() {
  const screen = useCommunityAgendaScreen();
  return (
    <View style={[styles.container, createAgendaInset(screen.insets.top)]}>
      <CommunityAgendaHeader onBack={screen.goBack} />
      {screen.data.loading ? <CommunityState type="loading" t={screen.t} /> : screen.data.error ? <CommunityState type="error" onAction={screen.data.retry} t={screen.t} /> : (
        <CommunityAgenda sections={screen.data.sections} marks={screen.data.marks} onOpen={screen.openItem} t={screen.t} />
      )}
    </View>
  );
}
