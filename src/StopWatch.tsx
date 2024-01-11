// Josh Chen
// 2024-Jan-10

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import StopwatchButton from './StopwatchButton'; 

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Format time to display as HH:MM:SS
  const formatTime = (time) => {
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
    <View>
      <Text>{formatTime(time)}</Text>
      <StopwatchButton
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />
    </View>
  );
}
