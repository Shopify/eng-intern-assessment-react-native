
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Stopwatch from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';

export default function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]); // Explicitly typing laps
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null; // Explicitly typing interval

    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000) as number; // Casting to number
    } else if (interval) {
      clearInterval(interval as number);
    }

    return () => {
      if (interval) {
        clearInterval(interval as number);
      }
    };
  }, [isRunning]);


  return (
    <View style={styles.container}>
      <Stopwatch time={time} laps={laps} />
      <StopwatchButton
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setTime(0);
          setLaps([]);
        }}
        onLap={() => setLaps(currentLaps => [...currentLaps, time])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

