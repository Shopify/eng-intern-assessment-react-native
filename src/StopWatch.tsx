import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

// Main StopWatch component
export default function StopWatch() {
  // State variables for managing the stopwatch
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Effect to update elapsed time every 10 milliseconds when running
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 10); // Update every 10 milliseconds
    }

    // Cleanup function to clear interval when component unmounts or isRunning changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // Handler to start/stop the stopwatch
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Handler to reset the stopwatch
  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  // Handler to record a lap
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, elapsedTime]);
  };

  // Helper function to format time in minutes, seconds, and milliseconds
  const formatTime = (timeInMilliseconds: number) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 100);
    const milliseconds = timeInMilliseconds % 100;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  // Render the StopWatch component
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <View style={styles.buttonContainer}>
        {/* Button to start/stop the stopwatch */}
        <StopWatchButton label={isRunning ? 'Stop' : 'Start'} onPress={handleStartStop} />
        {/* Button to record a lap */}
        <StopWatchButton label="Lap" onPress={handleLap} />
        {/* Button to reset the stopwatch */}
        <StopWatchButton label="Reset" onPress={handleReset} />
      </View>
      {/* Display recorded laps */}
      <View style={styles.lapContainer}>
        <Text style={styles.lapText}>Laps:</Text>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(lap)}`}</Text>
        ))}
      </View>
    </View>
  );
}

// Styles for the StopWatch component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  lapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  lapText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
