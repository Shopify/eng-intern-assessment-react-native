import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { StopWatch } from './src/StopWatch';
import { StopWatchButton } from './src/StopWatchButton';
import { LapList } from './src/LapList'; // Import the LapList component

const CURRENT_TIME = 0;

export default function App() {
  const [timeCount, setTimeCount] = useState<number>(CURRENT_TIME);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const [isStopWatchRunning, setIsStopWatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  const startTime = () => {
    setIsStopWatchRunning(true);

    const id = setInterval(() => setTimeCount((prev) => prev + 10), 10);
    setTimeInterval(id);
  };

  const stopTime = () => {
    if (timeInterval !== null) {
      clearInterval(timeInterval);
      setTimeInterval(null);
    }
    setIsStopWatchRunning(false);
  };

  const resetTime = () => {
    setTimeCount(0);
    setLaps([]); // Clear laps when resetting
  };

  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, timeCount]);
  };

  useEffect(() => {
    return () => {
      if (timeInterval !== null) {
        clearInterval(timeInterval);
        setTimeInterval(null);
      }
    };
  }, [timeInterval]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StopWatch stopWatchCount={timeCount} />
      <StopWatchButton
        isStopWatchRunning={isStopWatchRunning}
        startTime={startTime}
        stopTime={stopTime}
        resetTime={resetTime}
        addLap={addLap}
      />
      <LapList laps={laps} />
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