import {GestureResponderEvent, Text, View } from 'react-native';
import { styles } from './Styles';
import React, { useEffect, useState } from "react";
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  let id: number;

  useEffect(() => {
    if (isRunning) {
      id = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 10);
    } else {
        setElapsedTime(0);
    }
    return () => clearInterval(id);
  }, [isRunning]);

  const onStartStop = ():void => {
    setIsRunning(!isRunning);
  };

  const onReset = ():void => {
    if (isRunning) {
      setElapsedTime(0);
    }
    else{
      //lapping function
    }
  };

  const formatTime = (time: number) => {
    let hours: number = Math.floor(time/360000);
    let minutes: number = Math.floor((time % 360000) / 6000);
    let seconds: number = Math.floor((time % 6000) / 100);
    let milli: number = time % 100;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milli).padStart(2, '0')}`;
  };

  return (
    <View >
      <Text style= {styles.stopwatchText}> {formatTime(elapsedTime)} </Text>
      <StopWatchButton
        isRunning = {isRunning}
        onStartStop={onStartStop}
        onReset={onReset}
      />
    </View>
  );
}