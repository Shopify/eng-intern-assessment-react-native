import React from 'react';
import { StyleSheet, View } from 'react-native';
import Stopwatch from './src/Stopwatch';
import { useStopwatch } from './src/hooks/useStopwatch';

export default function App() {
  const { time, start, stop, pause, reset, lap, lapTimes, isRunning, showTime, hasStarted } = useStopwatch();

  return (
    <View style={styles.container}>
      <Stopwatch
        time={time}
        laps={lapTimes}
        onStart={start}
        onStop={stop}
        onPause={pause}
        onReset={reset}
        onLap={lap}
        showTime={showTime}
        isRunning={isRunning}
        hasStarted={hasStarted}
      />    
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
