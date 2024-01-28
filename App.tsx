import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import StopWatch from './src/components/StopWatch/StopWatch';

export default function App() {

  return (
    <View style={styles.container}>
      <StopWatch/>
      <StatusBar style="auto" />
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
