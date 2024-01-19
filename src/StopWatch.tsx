import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    handleStop();
    setTime(0);
  }
  const handleLap = () => setLaps([...laps, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonsRow}>
        <StopWatchButton title="Start" onPress={handleStart} />
        <StopWatchButton title="Stop" onPress={handleStop} />
        <StopWatchButton title="Reset" onPress={handleReset} />
        <StopWatchButton title="Lap" onPress={handleLap} />
      </View>
      {laps.map((lap, index) => (
        <Text key={index} style={styles.lapText}>
          Lap {index + 1}: {formatTime(lap)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 55,
    marginBottom:10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  lapText: {
    fontSize: 16,
  },
});
