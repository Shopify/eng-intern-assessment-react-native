import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton'; // Import custom button component

export default function StopWatch() {
  // State for tracking if stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
  // State for tracking current time in seconds
  const [time, setTime] = useState<number>(0);
  // State for storing lap times
  const [laps, setLaps] = useState<number[]>([]);

  // Effect to handle the running of the stopwatch
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      // Set up an interval to increment time every second
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1); 
      }, 1000);
    }
    // Clear interval when component unmounts or stopwatch stops
    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to start the stopwatch
  const start = () => setIsRunning(true);
  // Function to stop/pause the stopwatch
  const stop = () => setIsRunning(false);
  // Function to resume the stopwatch
  const resume = () => setIsRunning(true);
  // Function to reset the stopwatch
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  // Function to record a lap
  const recordLap = () => setLaps([...laps, time]);

  // Function to format the time into a readable format
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    // Formats time in hh:mm:ss format
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render the stopwatch component
  return (
    <View style={styles.stopwatchContainer}>
      {/* Time display */}
      <Text style={styles.timeDisplay}>{formatTime(time)}</Text>
      {/* Container for laps */}
      <ScrollView style={styles.lapsContainer} testID="lap-list">
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>{formatTime(lap)}</Text>
        ))}
      </ScrollView>
      {/* Container for buttons */}
      <View style={styles.buttonsContainer}>
        {!isRunning && time === 0 && <StopWatchButton title="Start" onPress={start} />}
        {isRunning && <StopWatchButton title="Stop" onPress={stop} />}
        {!isRunning && time !== 0 && <StopWatchButton title="Resume" onPress={resume} />}
        {isRunning && <StopWatchButton title="Lap" onPress={recordLap} />}
        {!isRunning && time !== 0 && <StopWatchButton title="Reset" onPress={reset} />}
      </View>
    </View>
  );
}

// Styles for the stopwatch component
const styles = StyleSheet.create({
  stopwatchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  lapsContainer: {
    alignSelf: 'stretch',
  },
  lapText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
});
