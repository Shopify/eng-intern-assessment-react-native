import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './src/StopWatchButton';
import { useState } from 'react';

export default function App() {

  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(!isRunning);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
