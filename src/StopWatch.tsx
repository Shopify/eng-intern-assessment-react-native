// Josh Chen
// 2024-Jan-10

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton'; 

// Stopwatch component
export default function Stopwatch() {
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); 
  
  useEffect(() => { 
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Format time to HH:MM:SS
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map(val => val < 10 ? `0${val}` : val)
      .join(':');
  };

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.timeDisplay}>{formatTime(time)}</Text>
      <StopwatchButton
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />
      <Text style={styles.instructions}>
        Press 'Start' to begin timing, 'Stop' to pause, and 'Reset' to clear! Thanks for using my app.
      </Text>

      <Text style={styles.josh}>
        Created by Josh Chen
      </Text>
    </View>
  );
}
// my custom styles, used in the Stopwatch component
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  josh: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
});