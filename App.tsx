import React from 'react';
import { StyleSheet, View } from 'react-native';
import Stopwatch from './src/Stopwatch';
import StopwatchButton from './src/StopwatchButton';
import { useStopwatch } from './src/hooks/useStopwatch';

export default function App() {

  const { time, start, stop, reset, lap, lapTimes } = useStopwatch();

  return (
    <View style={styles.container}>
      <Stopwatch time={time} laps={lapTimes} />
      <StopwatchButton onStart={start} onStop={stop} onReset={reset} onLap={lap} />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});