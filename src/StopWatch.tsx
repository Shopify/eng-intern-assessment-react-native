import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

// Import the StopWatchButton component for controlling stopwatch actions
import StopWatchButton from './StopWatchButton';
// Import the Clock component
import Clock from './Clock';
// Import the color configuration
import colors from '../config/colors';

// Define the StopWatch component
export default function StopWatch() {
  // State to track the elapsed time
  const [time, setTime] = useState(0);
  // State to track whether the stopwatch is running
  const [isOn, setIsOn] = useState(false);
  // State to store recorded laps with lap start time and lap elapsed time
  const [laps, setLaps] = useState<{ startTime: number; elapsedTime: number }[]>([]);

  // Effect hook to handle the interval for updating time
  useEffect(() => {
    let interval: number;

    // Start the interval when isOn is true
    if (isOn) {
      interval = setInterval(() => {
        // Update the time every millisecond
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    // Clear the interval when isOn changes
    return () => clearInterval(interval);
  }, [isOn]);

  // Function to start the stopwatch
  const startStopwatch = () => {
    setIsOn(true);
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    setIsOn(false);
  };

   // Function to reset the stopwatch
  const resetStopwatch = () => {
    setIsOn(false); // Stop the interval
    setTime(0);     // Reset the time
    setLaps([]);    // Clear recorded laps
  };

  // Function to record a lap
  const recordLap = () => {
    // Calculate the elapsed time for the lap
    const lapElapsedTime = laps.length > 0 ? time - laps[laps.length - 1].startTime : time;

    // Save the lap in the laps array
    setLaps((prevLaps) => [...prevLaps, { startTime: time, elapsedTime: lapElapsedTime }]);
  };


  // Function to format milliseconds to "MM:SS.SS"
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsPart = Math.floor((milliseconds % 1000) / 10);
  
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = millisecondsPart.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };


  // Render the StopWatch component
  return (
    <View style={styles.container}>
      <Clock time={time}/>
      <Text style={styles.text}>{formatTime(time)}</Text>
      <StopWatchButton
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onRecordLap={recordLap}
      />
      <View style={styles.divider}></View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {[...laps].reverse().map((lap, index) => (
            <Text
              key={index + 1}
              style={[
                styles.lapText,
                { color: 'white' },
                // Apply color based on the lap time comparison
                laps.length >= 3 && lap.elapsedTime === Math.min(...laps.map((lap) => lap.elapsedTime)) ? { color: colors.green, fontWeight: 'bold' } :
                laps.length >= 3 && lap.elapsedTime === Math.max(...laps.map((lap) => lap.elapsedTime)) ? { color: colors.red, fontWeight: 'bold'  } : null
              ]}
            >{`Lap ${laps.length - index}: ${formatTime(lap.elapsedTime)}`}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  divider: {
    height: 1,
    marginTop: 10,
    backgroundColor: colors.black,
    width: '100%',
  },
  lapText: {
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: colors.primary,
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
    height: 25,
    display: 'flex',
  },
  text: {
    fontSize: 30,
    color: colors.white,
    marginTop: -120,
    marginBottom: 100,
  },
});