import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';
import { useEffect, useRef, useState } from 'react';
import StopWatchLapTable from './src/StopWatchLapTable';

export default function App() {

  const [isRunning, setIsRunning] = useState<Boolean>(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [lapList, setLapList] = useState<string[]>([]);

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
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStartTime(0);
    setElapsedTime(0);
    setLapList([])
  };

  const lapStopwatch = () => {
    setLapList(prevList => [...prevList, formatTime(elapsedTime)]);
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
      <View style={styles.topContainer}>
        <StopWatch time={formatTime(elapsedTime)} />
        <StopWatchButton
          startStopwatch={startStopwatch}
          pauseStopwatch={pauseStopwatch}
          resetStopwatch={resetStopwatch}
          lapStopwatch={lapStopwatch}
          isRunning={isRunning}
        />
      </View>
      <View style={styles.bottomContainer}>
        <StopWatchLapTable lapList={lapList} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bottomContainer: {
    flex: 1,
    width: '100%'
  }
});
