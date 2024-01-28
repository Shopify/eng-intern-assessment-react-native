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
    setLapTime([]);
    setElapsedTime(0);
  };

  const onLap = ():void => {
    setLapTime(lapTime.concat(formatTime(elapsedTime)))
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.timeContainer}>
      <Text style= {styles.stopwatchText}> {formatTime(elapsedTime)} </Text>
      </View>
      <View style = {styles.buttonContainer}>
        <StopWatchButton
          label = {isRunning ? 'Stop' : 'Start'}
          onClick= {onStartStop}
        />
        <StopWatchButton
          label = {isRunning ? 'Lap' : 'Reset'}
          onClick= {isRunning ? onLap: onReset}
        />
      </View>
      <Laps
        laps = {lapTime}
      />
    </View>
  );
}

function formatTime(time: number): string {
  const hours: number = Math.floor(time/360000);
  const minutes: number = Math.floor((time % 360000) / 6000);
  const seconds: number = Math.floor((time % 6000) / 100);
  const milli: number = time % 100;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milli).padStart(2, '0')}`;
}

const Laps = React.memo(({laps}:{laps:string[]}) => {
  return (
    <ScrollView style={styles.scrollContainer}>
        {laps.map((lapTime, index) => 
          <Text key={index}>Lap {index + 1}: {lapTime}</Text>
        )}
    </ScrollView>
  );
});

