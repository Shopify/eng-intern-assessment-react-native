import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import StopWatch from './src/StopWatch';
import { theme } from './src/data/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StopWatch></StopWatch>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    color: theme.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
