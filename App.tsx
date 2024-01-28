import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';
import { useEffect, useRef, useState } from 'react';

export default function App() {

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startStopwatch = () => {
    const now = Date.now() - elapsedTime;
    setStartTime(now);
    setIsRunning(true);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - now);
    }, 10);
  };

  const pauseStopwatch = () => {

  }

  const resetStopwatch = () => {

  }

  const lapStopwatch = () => {

  }

  useEffect(() => {
    // Perform calibration - I do this to make sure the time is accurate
    const calibrationInterval = setInterval(() => {
      const actualElapsedTime = Date.now() - startTime;
      const deviation = actualElapsedTime - elapsedTime;
      // Adjust the stopwatch time if there's a significant deviation
      if (Math.abs(deviation) > 100) { // Adjust if deviation is more than 100 milliseconds
        setElapsedTime(actualElapsedTime);
      }
    }, 60000); // Calibration interval set to 1 minute

    return () => {
      clearInterval(calibrationInterval);
    };
  }, [elapsedTime, startTime]);

  const formatTime = (timeInMillis: number) => {
    const minutes = Math.floor((timeInMillis / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    const milliseconds = Math.floor((timeInMillis % 1000) / 10);
    return (
      `${minutes < 10 ? '0' + minutes : minutes}:` +
      `${seconds < 10 ? '0' + seconds : seconds}:` +
      `${milliseconds < 10 ? '0' + milliseconds : milliseconds}`
    );
  };


  return (
    <View style={styles.container}>
      <StopWatch
        time={formatTime(elapsedTime)}
      />
      <StopWatchButton
        startStopwatch={startStopwatch}
        pauseStopwatch={pauseStopwatch}
        resetStopwatch={resetStopwatch}
        lapStopwatch={lapStopwatch}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
