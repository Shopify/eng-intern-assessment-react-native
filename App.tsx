import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Stopwatch, {formatTime} from './src/StopWatch';
import StopwatchButton from './src/StopWatchButton';

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

  // Function to handle the start/stop button press
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(stopwatchRef.current!);
    } else {
      const startTime = Date.now() - elapsedTime;
      // Update elapsed time every 100 milliseconds
      stopwatchRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
     setIsRunning(!isRunning);
    };
  
    // Function to handle the reset button press
    const handleReset = () => {
      clearInterval(stopwatchRef.current!);
      setElapsedTime(0);
      setLaps([]);
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
        elapsedTime={elapsedTime}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
        />

        {/* Display the laps */}
        {laps.length > 0 && (
          <View style={styles.lapContainer}>
            <ScrollView style={styles.scrollView} testID='lap-list'>
              {laps.map((item, index) => (
                <View key={index} style={styles.lapItem}>
                  <Text style={styles.lapText}>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapContainer: {
    marginTop: 20,
    width: '100%',
    height: 300
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