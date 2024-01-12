import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { formatTime } from '../util/format';
import StopWatchButton from './StopWatchButton';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [laps, setLaps] = useState([]);
  const timeRef = useRef<number | null>(null);

  // handles starting and stopping the stopwatch
  const handleRun = () => {
    setIsRunning(!isRunning);
  }

  // handles resetting the stopwatch
  const handleReset = () => {
    clearInterval(timeRef.current as number);
    setTimePassed(0);
    setIsRunning(false);
    setLaps([]);
  }

  // handles and records lap times
  const handleLap = () => {
    // Derive date according to time that has passed till now
    const prevTime = new Date(Date.now() - timePassed);

    if (isRunning) {
      // Record lap corresponding to the time that has passed till now
      setLaps((prevLaps) => [...prevLaps, formatTime(Date.now() - prevTime.getTime())]);
    }
  };

  // Manages side-effects for starting and stopping the stopwatch
  useEffect(() => {
    if (isRunning) { // start the stowatch

      // Derive date according to time that has passed till now
      const prevTime = new Date(Date.now() - timePassed);

      // Start stopwatch from the previous date from when it was stopped
      timeRef.current = setInterval(() => {
        setTimePassed(Date.now() - prevTime);
      }, 1000); // updating every second
      
    } else { 
      // stop the stopwatch
      clearInterval(timeRef.current as number);
    }

    return () => {
      clearInterval(timeRef.current as number);
    }
  }, [isRunning]);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Displaying current state of stopwatch time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(timePassed)}
        </Text>
      </View>

      <StopWatchButton isRunning={isRunning} handleRun={handleRun} handleReset={handleReset} handleLap={handleLap}/>

      {/* Rendering a scrollable list to display lap times */}
      <View style={styles.lapListContainer}>
        <FlatList
          data={laps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item, index}) => (
              <View style={styles.lapContainer}>
                <Text style={styles.lapText}>{
                  `Lap ${index + 1}: ${item}`
                }</Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#696969',
    margin: 15
  },
  timeText: {
    color: "#fff",
    fontSize: 28,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lapListContainer: {
    flex: 0.5,
    width: '100%',
  },
  lapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#696969',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  lapText: {
    color: "#fff",
    fontSize: 24,
  }
});

export default Stopwatch;