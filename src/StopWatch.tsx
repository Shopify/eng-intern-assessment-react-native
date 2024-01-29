import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StopWatchButtons from './StopWatchButton';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // Lap Times should be [[lap1, elapsed1], [lap2, elapsed2]...
  const [lapTimes, setLapTimes] = useState<[number, number][]>([]);
  const [lapTime, setLapTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const handleStartStop = () => {
    if (isRunning) {
      // Stop the stopwatch
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      // Start the stopwatch
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentElapsedTime = Date.now() - startTime;
        setElapsedTime(currentElapsedTime);
      }, 100);
    }

    // Toggle the running state
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    // Stop the stopwatch if it's running
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    // Reset elapsed time
    setElapsedTime(0);
    setIsRunning(false);
    setLapTimes([]);
  };

  const handleLap = () => {
    console.log('elapsedTime:', elapsedTime);
    const currentLapTime = elapsedTime - lapTime;
    setLapTime(elapsedTime);
    // Append the list of lap times
    setLapTimes(prevLapTimes => [...prevLapTimes, [currentLapTime, elapsedTime]]);

  }


  return (
    <View style={styles.container}>
      <StopWatchButtons isRunning={isRunning} onStartStop={handleStartStop} onReset={handleReset} onLap={handleLap} />
      <Text style={styles.time}>{(elapsedTime / 1000).toFixed(2)} seconds</Text>
      <Text>Lap Times:</Text>
      <FlatList
        data={lapTimes}
        renderItem={({ item, index }) => {
          return <View key={index} style={styles.row}>
            <Text style={styles.cell}> Lap: {String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.cell}> {(item[0] / 1000).toFixed(2).padStart(5, '0')}s </Text>
            <Text style={styles.cell}> {(item[1] / 1000).toFixed(2).padStart(5, '0')}s </Text>
          </View>
        }}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    marginHorizontal: 15,
    padding: 10,
  },
  cell: {
    paddingRight: 10,
  }
});