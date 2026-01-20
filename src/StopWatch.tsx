import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList, ListRenderItem, SafeAreaView, Image } from 'react-native';
import StopwatchButton from './StopWatchButton';
import { LapData } from './types';
import { formatLapTime, formatTime } from './utils/formatTime';
import StopwatchDigit from './StopWatchDigit';

export default function StopWatch() {
  
  // State for tracking whether the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);

  // State for storing the start time
  const [startTime, setStartTime] = useState(Date.now());

  // State for storing the elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);

  // State for storing the interval ID
  const [intervalId, setIntervalId] = useState(0);

  // State for storing lap, lap start time, lap number
  const [laps, setLaps] = useState<LapData[]>([]);
  const [lapStartTime, setLapStartTime] = useState(Date.now())
  const [lapNumber, setLapNumber] = useState(1)

  // Effect hook for handling the stopwatch functionality
  useEffect(() => {
    if (isRunning) {
      // Set start time if not already set
      setStartTime(prevStartTime => prevStartTime || new Date().getTime());

      // Create an interval that updates the elapsed time
      const id = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime);
      }, 1);
      setIntervalId(id);
    } else {
      // Clear the interval when stopwatch stops
      clearInterval(intervalId);
      setIntervalId(0);
      setStartTime(0);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  // Event handler for reset button
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setLapNumber(1)
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  };

  // Event handler for start/stop button
  const handleStartStop = () => {
  setIsRunning(!isRunning);
  if (!isRunning) {
    setStartTime(new Date().getTime() - elapsedTime);
  }
};

  // Event handler for lap button
  const handleLap = () => {
    // Save the lap time difference
  const lapTime = new Date().getTime() - (laps.length == 0 ? startTime : lapStartTime);
  setLapNumber(lapNumber+1)
  setLaps(prevLaps => {
    const updatedLaps = [...prevLaps, { time: lapTime, number: lapNumber }];

    // Check if there are more than 10 laps, remove the first lap
    if (updatedLaps.length > 10) {
      updatedLaps.shift();
    }

    return updatedLaps;
  });

  // Update the startTime for the next lap
  setLapStartTime(new Date().getTime());
  };

  // Find fastest and slowest laps
  const fastestLap = laps.length > 0 ? Math.min(...laps.map(lap => lap.time)) : 0;
  const slowestLap = laps.length > 0 ? Math.max(...laps.map(lap => lap.time)) : 0;

  // Destructure formatted time into its components
  const { minutes_and_seconds, centisecondsArray } = formatTime(elapsedTime);

  return (
  <View>
    <View style={styles.container}>
      <StatusBar light-content />
      <View style={styles.display}>
       <Text style={styles.punct}>{minutes_and_seconds}</Text>
        {centisecondsArray.map((digit, index) => (
          <StopwatchDigit key={`centisecond-${index}`} value={digit} adjust={false} />
        ))} 
      </View>
      <View style={styles.buttons}>
        <StopwatchButton title={ isRunning ? 'Pause' : (elapsedTime == 0 ? 'Start' : 'Resume') } onPress={handleStartStop} />
        <StopwatchButton title={isRunning ? 'Lap' : 'Reset'} onPress={isRunning ? handleLap : handleReset} />
      </View>
    </View>
      <View testID='lap-list' style={styles.lapContainer}>
        {laps.map((lap, index) => (
          <View style={[styles.lapView, (laps[index+1] ? null : styles.lapBorder)]} key={index}>
          <Text style={styles.lap}>Lap {lap.number}:</Text>
          <Text style={[styles.lap, index == laps.map(lap => lap.time).indexOf(fastestLap) && styles.fastestLap, 
            index == laps.map(lap => lap.time).indexOf(slowestLap) && styles.slowestLap]}>{formatLapTime(lap.time)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// StyleSheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  display: {
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
  },

  buttons: {
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    gap: 150,
  },

  punct: {
    fontSize: 90,
    fontWeight: '100',
    color: '#fff',
  },

  lapContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  lapView: {
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },

  lapBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },

  lap: {
    color: '#fff',
    fontSize: 16,
  },

  fastestLap: {
    color: 'green',
  },
  slowestLap: {
    color: 'red',
  },

});