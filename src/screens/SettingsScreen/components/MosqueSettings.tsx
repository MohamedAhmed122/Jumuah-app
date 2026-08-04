import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import type { TFunction } from 'i18next';
import type { Mosque } from '@src/api/locations';
import { Colors } from '@constants/Colors';
import { SettingsSection } from './SettingsSection';
import { styles } from './MosqueSettings.styles';

interface Props {
  mosques: Mosque[];
  selected: string | null;
  error: boolean;
  onSelect: (id: string | null) => void;
  t: TFunction;
}

export function MosqueSettings({ mosques, selected, error, onSelect, t }: Props) {
  return (
    <SettingsSection label={t('settings.preferred_mosque')}>
      {error && <View style={styles.notice}><Text style={styles.noticeText}>{t('errors.api_failed')}</Text></View>}
      <MosqueOption
        label={t('settings.use_local_calculation')}
        active={selected === null}
        onPress={() => onSelect(null)}
      />
      {mosques.map((mosque) => (
        <MosqueOption
          key={mosque.id}
          label={mosque.name}
          address={mosque.address}
          active={selected === mosque.id}
          onPress={() => onSelect(mosque.id)}
        />
      ))}
    </SettingsSection>
  );
}

function MosqueOption(props: { label: string; address?: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.option, props.active && styles.optionActive]} onPress={props.onPress}>
      <View style={styles.optionText}>
        <Text style={[styles.optionLabel, props.active && styles.optionLabelActive]}>{props.label}</Text>
        {!!props.address && <Text style={styles.optionSub}>{props.address}</Text>}
      </View>
      {props.active && <MaterialCommunityIcons name="check" size={18} color={Colors.accent} />}
    </TouchableOpacity>
  );
}
