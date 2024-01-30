import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { StopWatch } from './src/StopWatch';
import { StopWatchButton } from './src/StopWatchButton';
import { LapList } from './src/LapList'; 

const CURRENT_TIME = 0;

export default function App() {

  // States that keep track of the time 
  const [timeCount, setTimeCount] = useState<number>(CURRENT_TIME);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const [isStopWatchRunning, setIsStopWatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);


  // Start Time Function
  const startTime = () => {
    setIsStopWatchRunning(true);
    
    // Calculate the initial elapsed time when starting
    const startTimeStamp = performance.now() - timeCount;

    const id = setInterval(() => {

      const currentTimeStamp = performance.now();
      const elapsedTime = currentTimeStamp - startTimeStamp;
      setTimeCount(Math.floor(elapsedTime));

    }, 10);
    setTimeInterval(id);

  };


  // Stop Time Function
  const stopTime = () => {
    if (timeInterval !== null) {
      clearInterval(timeInterval);
      setTimeInterval(null);
    }
    setIsStopWatchRunning(false);
  };

  // Reset Time Function
  const resetTime = () => {
    setTimeCount(0);
    setLaps([]); 
  };

  // Add Lap Function
  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, timeCount]);
  };

  useEffect(() => {
    return () => {
      if (timeInterval !== null) {
        clearInterval(timeInterval);
        setTimeInterval(null);
      }
    };
  }, [timeInterval]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StopWatch stopWatchCount={timeCount} />
      <StopWatchButton
        isStopWatchRunning={isStopWatchRunning}
        startTime={startTime}
        stopTime={stopTime}
        resetTime={resetTime}
        addLap={addLap}
      />
      <LapList laps={laps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});