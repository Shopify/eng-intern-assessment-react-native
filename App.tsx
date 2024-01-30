import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';

type StopWatchRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getFormattedTime: () => string;
};

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const stopWatchRef = useRef<StopWatchRef | null>(null);

  // Function to start or stop the stopwatch based on its current state
  const startStopWatch = () => {
    if (!isRunning) {
      stopWatchRef.current!.start();
      setIsRunning(true);
    } else {
      stopWatchRef.current!.stop();
      setIsRunning(false);
    }
  };

  // Function to reset the stopwatch and clear recorded laps
  const resetStopWatch = () => {
    stopWatchRef.current!.reset();
    setIsRunning(false);
    setLaps([]);
  };

  // Function to record a lap in the stopwatch
  const recordLap = () => {
    const lapTime = stopWatchRef.current!.getFormattedTime();
    setLaps((previousLaps) => [...previousLaps, lapTime]);
  };

  return (
    <View style={styles.container}>
      <StopWatch ref={stopWatchRef} />

      {/* Buttons to control the stopwatch */}
      <StopWatchButton title={isRunning ? 'Stop' : 'Start'} onPress={startStopWatch} />
      <StopWatchButton title="Reset" onPress={resetStopWatch} />
      <StopWatchButton title="Lap" onPress={recordLap} />

      {/* Display recorded laps */}
      {laps.map((lap, index) => (
        <Text key={index}>{`Lap ${index + 1}: ${lap}`}</Text>
      ))}
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