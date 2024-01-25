import { View, Text} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import React, {useState,useEffect} from "react";
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [time, setTime] = useState(0);
  // @ts-ignore
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const start = () => {
    if(timerId === null) {
      const id = setInterval(() =>{
        setTime((prevTime) => prevTime +10);
      }, 10);
      setTimerId(10);
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (timerId !== null) {
      clearInterval(timerId);
      setTimerId(null);
      setIsRunning(false);
    }
  };

  const reset = () => {
    stop();
    setTime(0);
    setLapTimes([]);
  }

  const lap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  useEffect(() => {
    return () => {
      if(timerId !== null) {
        clearInterval(timerId);
      }
    }
  }, [timerId]);

  useEffect(() => {
    if(isRunning && time %10 === 10) {
      const id = setTimeout(() =>{
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setTimerId(id);
    }

    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, [isRunning, time]);

  return (
    <View>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
        {('0' + ((time / 10) % 100)).slice(-2)}
      </Text>
      <StopWatchButton
        title={isRunning ? 'Lap' : 'Start'}
        onPress={isRunning ? lap : start}
      />
      <StopWatchButton title="Stop" onPress={stop} />
      <StopWatchButton title="Reset" onPress={reset} />
      <View>
        {lapTimes.map((lapTime, index) => (
          <Text key={index} style={{ fontSize: 16 }}>
            Lap {index + 1}: {(lapTime / 10).toFixed(2)}
          </Text>
        ))}
      </View>
    </View>
  );
}