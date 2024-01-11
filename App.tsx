import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './src/StopWatchButton';
import { useState } from 'react';
import StopWatch from './src/StopWatch';

export default function App() {

  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(!isRunning);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StopWatch time={1000} />
      <StopWatchButton isRunning={isRunning} handleRun={handleRun} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
