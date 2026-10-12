import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useNotFoundScreen } from './hooks/NotFoundScreen.hooks';
import { styles } from './NotFoundScreen.styles';

export default function NotFoundScreen() {
  const { body, homeLabel, screenOptions } = useNotFoundScreen();

  return (
    <>
      <Stack.Screen options={screenOptions} />
      <View style={styles.container}>
        <Text style={styles.title}>{body}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{homeLabel}</Text>
        </Link>
      </View>
    </>
  );
}
