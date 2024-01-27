// StopWatch.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [time, ...prevLaps]);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
      <StopWatchButton onPress={handleStartStop}
  title={isRunning ? 'Stop' : time === 0 ? 'Start' : 'Resume'}
/>
        <StopWatchButton onPress={handleLap} title="Lap" />
        <StopWatchButton onPress={handleReset} title="Reset" />
      </View>
      <View style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {laps.length - index}: {formatTime(lap)}
          </Text>
        ))}
      </View>
    </View>
  );
}

  const formatTime = (timeInMilliseconds: number) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = timeInMilliseconds % 1000;


  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
    milliseconds
  ).slice(0,2).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  lapsContainer: {
    marginTop: 20,
  },
  lapText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
