import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 10); // Increment every 10 milliseconds
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    setLaps([...laps, timeElapsed]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000); // 1 Hour = 3600000 Milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 Minute = 60000 Milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 Second = 1000 Milliseconds
    const millis = Math.floor((milliseconds % 1000) / 10); // Display only two digits for milliseconds
  
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.timerDisplayContainer}>
        <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
      </View>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(lap)}`}</Text>
      ))}
      <View style={styles.buttonContainer}>
        <StopWatchButton title={isRunning ? "Stop" : "Start"} onPress={handleStartStop} />
        <StopWatchButton title="Lap" onPress={handleLap} />
        <StopWatchButton title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    width: '100%', // Full width of the parent
    alignItems: 'center',
  },
  timerDisplayContainer: {
    minWidth: 250, // Ensure this is wide enough for the longest expected time string
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  lapText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // This will arrange buttons side by side
    justifyContent: 'space-around',
    width: '50%', // Adjust as needed
    marginTop: 20,
  },
});

export default StopWatch;
