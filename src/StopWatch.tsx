// StopWatch.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import StopWatchButton from './StopWatchButton';

// Functional component representing the main stopwatch screen
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  // Effect hook to update the time every 10 milliseconds when the stopwatch is running
  useEffect(() => {
    let interval: number;
      
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Toggle the running state of the stopwatch (Start/Stop/Resume)
  const handleStartStop = () => {
    setTime((prevTime) => prevTime + 10);
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  // Record the current time as a lap
  const handleLap = () => {
    setLaps((prevLaps) => [time, ...prevLaps]);
  };

  // Reset the stopwatch by setting time to 0, clearing lap records, and stopping the stopwatch
  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  // Calculate the rotation of the clock arm based on the elapsed time
    const clockArmRotation = {
    transform: [{ rotate: `${(time / 1000) * 6}deg` }],
  };

  // Render the UI for the stopwatch
  return (
    <SafeAreaView style={styles.container}>
            <Image
          source={require('./clock.png')}
          style={[styles.clock, clockArmRotation]}
        />

      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
      <StopWatchButton  title={isRunning ? 'Pause' : time != 0 ? 'Resume':'Start'} onPress={handleStartStop}/>
       <StopWatchButton onPress={handleStop} title="Stop" />
        <StopWatchButton onPress={handleLap} title="Lap" />
        <StopWatchButton onPress={handleReset} title="Reset" />
      </View>
      <ScrollView style={styles.lapsContainer} contentContainerStyle={styles.lapText} testID= "lap-list">
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapText} testID= "lap-text">
            Lap {laps.length - index}: {formatTime(lap) }
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Format time in milliseconds into a readable time format (mm:ss.SS or hh:mm:ss.SS)
  const formatTime = (timeInMilliseconds: number) => {
  const hours = Math.floor(timeInMilliseconds / 3600000);
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = timeInMilliseconds % 1000;
  
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}h:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
      milliseconds
    ).slice(0, 2).padStart(2, '0')}`;
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).slice(0, 2).padStart(2, '0')}`;
  }
};

// Styles for the components
const styles = StyleSheet.create({
  // Main container style
  container: {
    width: '100%',
    length:'100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  // Style for the timer text
  timerText: {
    fontSize: 45,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'ArialMT' : undefined,
  },
  // Style for the button container
  buttonContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom:10
  },
  // Style for the lap records container
  lapsContainer: {
    marginTop: 20,
    flex: 1, 
    alignSelf: 'stretch', // Stretch the ScrollView to fill the width
  },
  // Style for individual lap record text
  lapText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center' 
  },
  // Style for the clock image
  clock: {
    marginTop:100,
    width: 120,
    height: 120
  },
  //Style for clock Container
  clockContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
