// StopWatch.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [time, ...prevLaps]);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

    const clockArmRotation = {
    transform: [{ rotate: `${(time / 1000) * 6}deg` }],
  };

  return (
    <View style={styles.container}>
            <Image
          source={require('./clock.png')}
          style={[styles.clock, clockArmRotation]}
        />
        


      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
      <StopWatchButton onPress={handleStartStop}
  title={isRunning ? 'Stop' : time === 0 ? 'Start' : 'Resume'}
/>
        <StopWatchButton onPress={handleLap} title="Lap" />
        <StopWatchButton onPress={handleReset} title="Reset" />
      </View>
      <ScrollView style={styles.lapsContainer} contentContainerStyle={styles.lapsContent}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText}>
            Lap {laps.length - index}: {formatTime(lap)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

  const formatTime = (timeInMilliseconds: number) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = timeInMilliseconds % 1000;
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
    milliseconds
  ).slice(0,2).padStart(2, '0')}`;
};

const circleSize = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  timerText: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Nunito',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  lapsContainer: {
    marginTop: 20,
    flex: 1, // Let the ScrollView take all the available space
    alignSelf: 'stretch', // Stretch the ScrollView to fill the width
  },
  lapText: {
    fontSize: 13,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Nunito',
    textAlign: 'center' 
  },
  clock: {
    marginTop:100,
    width: 100,
    height: 100
  },
  clockContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
