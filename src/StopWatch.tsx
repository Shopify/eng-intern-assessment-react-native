import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
      let interval: number | undefined;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerOn]);

  const formatTime = (time: number): string => {
    const getTwoDigits = (num: number): string => num.toString().padStart(2, '0');
    const minutes = getTwoDigits(Math.floor(time / 60000) % 60);
    const seconds = getTwoDigits(Math.floor(time / 1000) % 60);
    const milliseconds = getTwoDigits(Math.floor((time / 10) % 100));

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleStart = () => setTimerOn(true);
  const handlePause = () => setTimerOn(false);
  const handleLap = () => setLaps([...laps, time]);
  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setTimerOn(false);
  };

  return (
    <View style={styles.container}>
      <Text testID="stopwatch-time">{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <StopWatchButton label="Start" onPress={handleStart} />
        <StopWatchButton label="Pause" onPress={handlePause} />
        <StopWatchButton label="Lap" onPress={handleLap} />
        <StopWatchButton label="Reset" onPress={handleReset} />
      </View>
      <ScrollView testID="lap-list">
        {laps.map((lapTime, index) => (
          <Text key={index}>{formatTime(lapTime)}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
