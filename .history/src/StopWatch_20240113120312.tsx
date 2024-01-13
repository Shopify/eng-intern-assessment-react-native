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
        setTimeElapsed(prevTime => prevTime + 1); // Assuming timeElapsed is in seconds
      }, 1000);
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

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`Time: ${timeElapsed}s`}</Text>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapText}>{`Lap ${index + 1}: ${lap}s`}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lapText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // This will arrange buttons side by side
    justifyContent: 'space-around',
    width: '100%', // Adjust as needed
    marginTop: 20,
  },
});

export default StopWatch;
