import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Stopwatch from './src/StopWatch';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stopwatch/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
