import {GestureResponderEvent, ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';
import React, { useEffect, useState } from "react";
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTime, setLapTime] = useState<string[]>([]);
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
    if (isRunning == false) {
      setElapsedTime(0);
    }
    else{
      setLapTime(lapTime.concat(formatTime(elapsedTime)));
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
        lapTimes={lapTime}
      />
    </View>
  );
}