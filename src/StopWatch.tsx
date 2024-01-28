import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StopWatchButtons from './StopWatchButton';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lapTime, setLapTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const handleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      // Start the stopwatch
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentElapsedTime = Date.now() - startTime;
        setElapsedTime(currentElapsedTime);
      }, 100); // Update every 100 milliseconds
    }

    // Toggle the running state
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    // Stop the stopwatch if it's running
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    // Reset elapsed time
    setElapsedTime(0);
    setIsRunning(false);
  };

  const handleLap = () => {
    console.log('elapsedTime:', elapsedTime);
    const currentLapTime = elapsedTime - lapTime;
    const lapTimeTuple = [currentLapTime, lapTime];
    setLapTime(elapsedTime);
    setLapTimes([...lapTimes, ...lapTimeTuple]);
  }

  return (
    <View style={styles.container}>
      <StopWatchButtons isRunning={isRunning} onStartStop={handleStartStop} onReset={handleReset} onLap={handleLap} />
      <Text style={styles.time}>{(elapsedTime / 1000).toFixed(2)} seconds</Text>
      <Text>Lap Times:</Text>
      {lapTimes.map((lapTime, index) => (
        <Text key={index}>{(lapTime / 1000).toFixed(2)} seconds</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    marginBottom: 20,
  },
});
