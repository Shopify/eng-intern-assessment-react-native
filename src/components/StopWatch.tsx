import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { styles } from '../styles/styles';

import LapResetButton from './LapResetButton';
import StopWatchButton from './StopWatchButton';
import FastestLap from './FastestLap';
import SlowestLap from './SlowestLap';

const customFonts = {
  Roboto: require('../../assets/fonts/Roboto-Thin.ttf'),
};

export default function StopWatch() {

  async function loadFonts() {
    await Font.loadAsync(customFonts);
  }

  const [displayTime, setDisplayTime] = useState<string>('00:00:00');
  const [laps, setLaps] = useState<number[]>([]);
  const [indexLaps, setIndexLaps] = useState<string[]>([]);

  const [running, setRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const milli = Math.floor((milliseconds % 1000) / 10);

    let timeString = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
      milli.toString().padStart(2, '0'),
    ].join(':');

    // will change to 00:00:00:00 format once one hour hits
    if (hours > 0) {
      timeString = hours.toString().padStart(2, '0') + ':' + timeString;
    }

    return timeString;
  };

  const handleLap = () => {
    const currentTime = Date.now();
    const lastLapTime = laps.length > 0 ? laps[laps.length - 1] : startTimeRef.current;
    const newLapTime = currentTime - lastLapTime;
  
    setLaps(previousLaps => [...previousLaps, currentTime]); 
    const formattedLapTime = formatTime(newLapTime);
    setIndexLaps(previousFormattedLaps => [...previousFormattedLaps, formattedLapTime]);
  };

  // fastest and slowest indices
  const getLapIndices = (lapTimestamps: number[]) => {
    const lapDurations = lapTimestamps.map((endTime, index) => 
      endTime - (index === 0 ? startTimeRef.current : lapTimestamps[index - 1])
    );

    let fastestLapTime = Number.MAX_SAFE_INTEGER;
    let slowestLapTime = 0; 
    let fastestLapIndex = -1;
    let slowestLapIndex = -1;

    lapDurations.forEach((duration, index) => {
      if (duration < fastestLapTime) {
        fastestLapTime = duration;
        fastestLapIndex = index;
      }
      if (duration > slowestLapTime) {
        slowestLapTime = duration;
        slowestLapIndex = index;
      }
    });

    return { fastestLapIndex, slowestLapIndex };
  };

  const { fastestLapIndex, slowestLapIndex } = getLapIndices(laps);
  
  // start and stop timer
  const toggleStopwatch = () => {
    if (!running) {
      startTimeRef.current = Date.now() - timeElapsed;
      timerRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTimeRef.current);
      }, 10);
      setRunning(true);
    } else {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    startTimeRef.current = Date.now(); 
    setTimeElapsed(0);
    setRunning(false);
    setDisplayTime('00:00:00');
    setLaps([]); 
    setIndexLaps([]); 
  };
  

  useEffect(() => {
    
    loadFonts();  // load custom roboto font

    if (running) {
      const interval = setInterval(() => {
        const newTimeElapsed = Date.now() - startTimeRef.current;
        setTimeElapsed(newTimeElapsed);
        setDisplayTime(formatTime(newTimeElapsed));
      }, 10);
      return () => clearInterval(interval);
    }
  }, [running]);


  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{displayTime}</Text>
      <View style={styles.buttonsContainer}>
        <StopWatchButton 
          running={running} 
          toggleStopwatch={toggleStopwatch} 
        />
        <LapResetButton
          isRunning={running}
          onLap={handleLap}
          onReset={resetStopwatch}
        />
      </View>
      {/* orders laps in reverse order so most recent lap is at top*/}
      <ScrollView style={styles.lapList}>
        {indexLaps.slice().reverse().map((formattedLap, index) => {
          const lapIndex = indexLaps.length - index - 1; 
          if (lapIndex === fastestLapIndex) {
            return <FastestLap key={lapIndex} lapTime={formattedLap} index={lapIndex + 1} />;
          } else if (lapIndex === slowestLapIndex) {
            return <SlowestLap key={lapIndex} lapTime={formattedLap} index={lapIndex + 1} />;
          } else {
            return (
              <View key={lapIndex} style={styles.lapContainer}>
                <Text style={styles.lapNumber}>Lap {lapIndex + 1}</Text>
                <Text style={styles.lapTime}>{formattedLap}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};