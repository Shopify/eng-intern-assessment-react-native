import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Stopwatch from './src/Stopwatch';
import StopwatchButton from './src/StopwatchButton';

/**
 * Stopwatch App Component
 * @component
 */
export default function App() {
  //State variables
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  
  //References to hold interval and start time
  const intervalRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);

  /**
   * Initiates the stopwatch, starting the timer and updating the `isRunning` state.
   */
  const startStopwatch = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(updateTime, 10);
    }
    setIsRunning(true);
  };

  /**
   * Stops the running stopwatch, clearing the interval and updating the `isRunning` state.
   */
  const stopStopwatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
  };

  /**
   * Resets the stopwatch to its initial state, clearing the interval, resetting elapsed time to zero,
   * clearing lap records, and updating the `isRunning` state.
   */
  const resetStopwatch = () => {
    clearInterval(intervalRef.current!);
    setElapsedTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  /**
   * Records a lap time if the stopwatch is currently running. It calculates the lap time based on the
   * current time and the start time.
   */
  const lapStopwatch = () => {
    if (isRunning) {
      const lapTime = Date.now() - startTimeRef.current!;
      setLaps([...laps, lapTime]);
    }
  };

  /**
   * Updates the `elapsedTime` state based on the current time and the start time.
   * This function is called periodically by the interval.
   */
  const updateTime = () => {
    setElapsedTime(Date.now() - startTimeRef.current!);
  };

  //Render component
  return (
    <View style={styles.container}>
      {/* Stopwatch component displaying elapsed time and lap records */}
      <Stopwatch elapsedTime={elapsedTime} laps={laps} />

      {/* StopwatchButton component providing control buttons */}
      <StopwatchButton
        onStartPress={startStopwatch}
        onStopPress={stopStopwatch}
        onResetPress={resetStopwatch}
        onLapPress={lapStopwatch}
        isRunning={isRunning}
      />
    </View>
  );
}

//Styles for the main container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
