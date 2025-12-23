import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Stopwatch from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';

export default function App() {
  // State for tracking time, laps, and whether the stopwatch is running
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Effect for handling the stopwatch timing
  useEffect(() => {
    let interval: number | null = null;

    // Set an interval when the stopwatch is running
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 10); // Increment time every 10 milliseconds
      }, 10);
    } else if (interval) {
      // Clear the interval if the stopwatch is stopped
      clearInterval(interval as number);
    }

    // Cleanup function to clear the interval
    return () => {
      if (interval) {
        clearInterval(interval as number);
      }
    };
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      {/* Stopwatch header */}
      <Text style={styles.header}>Stopwatch</Text>

      {/* Stopwatch display */}
      <Stopwatch time={time} laps={laps} />

      <View style={styles.spacer} />

      {/* Stopwatch control buttons */}
      <StopwatchButton
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setTime(0);
          setLaps([]);
        }}
        onLap={() => {
          // Add the current time to the laps array
          setLaps(currentLaps => [...currentLaps, time]);
        }}
      />

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  spacer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

