import {Text, View } from 'react-native';
import { styles } from './Styles';
import React, { useEffect, useState } from "react";
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let id: number;
    if (isRunning) {
      const id = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1);
    }
    return () => clearInterval(id);
  }, [isRunning]);

  const onStartStop = () => {
    setIsRunning(!isRunning);
  };

  const onReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time: number) => {
    let hours: number = Math.floor(time/3600000);
    let minutes: number = Math.floor((time % 3600000) / 60000);
    let seconds: number = Math.floor((time % 60000) / 1000);
    let milli: number = time % 1000;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milli).padStart(3, '0')}`;
  };

  return (
    <View >
      <Text>  </Text>
    </View>
  );
}