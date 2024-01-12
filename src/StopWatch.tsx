import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton'; 

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1); 
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  const recordLap = () => setLaps([...laps, time]);

  // Format time into hours, minutes, and seconds
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.timeDisplay}>{formatTime(time)}</Text>
      <ScrollView style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>{formatTime(lap)}</Text>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <StopWatchButton title="Start" onPress={start} />
        <StopWatchButton title="Stop" onPress={stop} />
        <StopWatchButton title="Lap" onPress={recordLap} />
        <StopWatchButton title="Reset" onPress={reset} />
      </View>
    </View>
  );
}

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
