
import React, { useState, useEffect, ReactElement } from 'react';
import { View, Text, ScrollView } from 'react-native';
import StopWatchButton from './StopWatchButton';
import StopWatchStyles from './StopWatchStyle';
interface LapTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
export default function StopWatch ():ReactElement {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  const handleStartAndStop = () => {
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };
  const handleLap = () => {
    if (isRunning) {
      const lapTime: LapTime = {
        hours,
        minutes,
        seconds,
        milliseconds,
      };
      setLaps([...laps, lapTime]);
    }
  };
  return (
    <View  style={StopWatchStyles.stopwatchContainer}>
      <Text style={StopWatchStyles.stopwatchTime}>
        <Text>{hours}:{minutes.toString().padStart(2, '0')}:</Text>
        <Text>{seconds.toString().padStart(2, '0')}:</Text>
        <Text>{milliseconds.toString().padStart(2, '0')}</Text>
      </Text>
      <ScrollView style={StopWatchStyles.lapList}>
        {laps.map((lapTime, index) => (
          <Text key={index} style={StopWatchStyles.lapItem}>
            Lap {index + 1}: {lapTime.hours}:{lapTime.minutes.toString().padStart(2, '0')}:{lapTime.seconds.toString().padStart(2, '0')}.{lapTime.milliseconds.toString().padStart(2, '0')}
          </Text>
        ))}
      </ScrollView>
      <View style={StopWatchStyles.stopwatchButtons}>
        <StopWatchButton 
        reset = {handleReset}
        isRunning = {isRunning}
        lap = {handleLap}
        startAndStop = {handleStartAndStop}      
        />
      </View>
    </View>
  );
};































