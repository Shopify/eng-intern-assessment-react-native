import React, { useState, useRef, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Stopwatch from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';

// Formatting function for time
const formatTime = (timeInMillis: number) => {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((timeInMillis % 1000) / 10);

  return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
};

// Using React.memo to optimize rendering of laps and reduce lag / improve app performance.
const LapItem = React.memo(({ item, index }: { item: number; index: number }) => (
  <View style={styles.lapItem}>
    <Text style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
  </View>
));


// App function containing the functionality of the stopwatch
export default function App() {
  // State to manage whether the stopwatch is running or stopped
  const [isRunning, setIsRunning] = useState(false);

  // State to track the elapsed time of the stopwatch
  const [elapsedTime, setElapsedTime] = useState(0);

  // Ref to hold the interval ID for the stopwatch
  const stopwatchRef = useRef<number | null>(null);

  // State to keep track of laps
  const [laps, setLaps] = useState<number[]>([]);
  const memoizedLaps = useMemo(() => laps, [laps]);


  // Function to handle the start/stop button press
  const handleStartStop = () => {

    // If running, stop the stopwatch, if not running, start the stopwatch
    if (isRunning) {
      clearInterval(stopwatchRef.current!);
    } else {
      const startTime = Date.now() - elapsedTime;
      // Update elapsed time every 10 milliseconds
      stopwatchRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

     // Toggle the running state
     setIsRunning(!isRunning);
    };
  
    // Function to handle the reset button press
    const handleReset = () => {
      // Stop the stopwatch
      clearInterval(stopwatchRef.current!);
      // Reset elapsed time to zero
      setElapsedTime(0);
      // set Laps
      setLaps([]);
      // Set running state to false
      setIsRunning(false);
    };

    // Function to handle laps button press
    const handleLap = () => {
      if (isRunning) {
        setLaps((prevLaps) => [...prevLaps, elapsedTime]);
      }
    };

  return (
    <View style={styles.container}>
      
      {/* Display the stopwatch*/}
      <Stopwatch elapsedTime={elapsedTime} />
      
  {/* Display the start/stop, lap, and reset buttons */}
  <StopwatchButton
        isRunning={isRunning}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
      />

  {/* Display the laps */}
  {memoizedLaps.length > 0 && (
        <View style={styles.lapContainer}>
          <ScrollView style={styles.scrollView} testID='lap-list'>
            {memoizedLaps.map((item, index) => (
              <LapItem key={index} item={item} index={index} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapContainer: {
    marginTop: 20,
    width: '100%',
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lapText: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    width: '100%',
  },
});