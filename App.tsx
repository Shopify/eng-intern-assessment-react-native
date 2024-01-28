import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';

export default function App() {

  const startStopwatch = () => {

  }

  const pauseStopwatch = () => {

  }

  const resetStopwatch = () => {

  }

  const lapStopwatch = () => {

  }

  return (
    <View style={styles.container}>
      <StopWatch
        time={'00:00:00'}
      />
      <StopWatchButton
        startStopwatch={startStopwatch}
        pauseStopwatch={pauseStopwatch}
        resetStopwatch={resetStopwatch}
        lapStopwatch={lapStopwatch}
      />
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
