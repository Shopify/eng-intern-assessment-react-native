import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';
import { styles } from '../styles/styles';

const customFonts = {
  Roboto: require('../../assets/fonts/Roboto-Thin.ttf'),
};

export default function StopWatch(){

  async function loadFonts() {
    await Font.loadAsync(customFonts);
  }

  const [displayTime, setDisplayTime] = useState<string>('00:00:00');

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

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if(running){
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
      <TouchableOpacity
          style={running ? styles.stopButton : styles.startButton}
          onPress={toggleStopwatch}
        >
          <Text style={running ? styles.buttonTextStart : styles.buttonTextStop}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};