import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Stopwatch from './src/Stopwatch';
import StopwatchButton from './src/StopwatchButton';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);

  const startStopwatch = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(updateTime, 10);
    }
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current!);
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const lapStopwatch = () => {
    if (isRunning) {
      const lapTime = Date.now() - startTimeRef.current!;
      setLaps([...laps, lapTime]);
    }
  };

  const updateTime = () => {
    setElapsedTime(Date.now() - startTimeRef.current!);
  };

  return (
    <View style={styles.container}>
      <Stopwatch elapsedTime={elapsedTime} />
      <StopwatchButton
        onStartPress={startStopwatch}
        onStopPress={stopStopwatch}
        onResetPress={resetStopwatch}
        onLapPress={lapStopwatch}
        isRunning={isRunning}
      />
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
