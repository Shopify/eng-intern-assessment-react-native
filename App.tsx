import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';

export default function App() {
  // State variables for time and stopwatch running status
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    // Set interval to update time every second when the stopwatch is running
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }

    // Clear interval on component unmount or when stopwatch stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]); // Dependence on isRunning to start/stop interval

  return (
    <View style={styles.container}>
      {/* Stopwatch display */}
      <StopWatch time={time} />
      {/* Controls for starting/stopping and resetting the stopwatch */}
      <StopWatchButton setIsRunning={setIsRunning} setTime={setTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
