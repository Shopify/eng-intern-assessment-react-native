// App.tsx
/// <reference types="node" />


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Stopwatch from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';

const App: React.FC = () => {
  // State variables to manage the stopwatch functionality
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Effect to update the elapsed time when the stopwatch is running
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clean up the interval when the component is unmounted or isRunning is set to false
    return () => clearInterval(interval);
  }, [isRunning]);

  // Event handler to start the stopwatch
  const handleStart = () => {
    setIsRunning(true);
  };

  // Event handler to stop the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  // Event handler to reset the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  // Event handler to record a lap in the stopwatch
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  // Render the main application UI
  return (
    <View style={styles.container}>
      <Stopwatch elapsedTime={elapsedTime} />
      <StopwatchButton
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
      <View style={styles.lapsContainer}>
        {/* Render laps recorded */}
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {index + 1}: {lap} seconds
          </Text>
        ))}
      </View>
    </View>
  );
};

// Styles for the main application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapsContainer: {
    marginTop: 20,
  },
  lapText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;
