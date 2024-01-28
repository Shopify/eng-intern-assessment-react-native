import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import StopWatchLapTable from './StopWatchLapTable';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState<Boolean>(false);
  const [isPaused, setIsPaused] = useState<Boolean>(false);
  const [isStoped, setIsStoped] = useState<Boolean>(false);

  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const [startLapTime, setStartLapTime] = useState(0);
  const [elapsedLapTime, setElapsedLapTime] = useState(0);
  const lapIntervalRef = useRef<number | null>(null);
  const [lapList, setLapList] = useState<string[]>([]);

  const startStopwatch = () => {
    const now = Date.now() - elapsedTime;
    const lapNow = Date.now() - elapsedLapTime;

    setStartTime(now);
    setStartLapTime(lapNow);
    setIsRunning(true);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 10);
    lapIntervalRef.current = setInterval(() => {
      setElapsedLapTime(Date.now() - lapNow);
    }, 10);
  };

  const pauseStopwatch = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
    }
  };

  const stopStopwatch = () => {
    setIsStoped(true);
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsPaused(false)
    setIsStoped(false)
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
      lapIntervalRef.current = null;
    }
    setStartTime(0);
    setElapsedTime(0);

    setStartLapTime(0);
    setElapsedLapTime(0);

    setLapList([])
  };

  const lapStopwatch = () => {
    setLapList(prevList => [formatTime(elapsedLapTime), ...prevList]);
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
      lapIntervalRef.current = null;
    }
    setStartLapTime(0);
    setElapsedLapTime(0);

    const lapNow = Date.now();
    setStartLapTime(lapNow);
    if (lapIntervalRef.current !== null) {
      clearInterval(lapIntervalRef.current);
    }
    lapIntervalRef.current = setInterval(() => {
      setElapsedLapTime(Date.now() - lapNow);
    }, 10);
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

      const actualElapsedLapTime = Date.now() - startLapTime;
      const lapDeviation = actualElapsedLapTime - elapsedLapTime;
      // Adjust the stopwatch time if there's a significant deviation
      if (Math.abs(lapDeviation) > 100) { // Adjust if deviation is more than 100 milliseconds
        setElapsedLapTime(actualElapsedLapTime);
      }
    }, 60000); // Calibration interval set to 1 minute

    return () => {
      clearInterval(calibrationInterval);
    };
  }, [elapsedTime, elapsedLapTime, startTime, startLapTime]);

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
        <Text style={styles.timeText}>
        {!isStoped ? formatTime(elapsedTime) : ''}
        </Text>
        <StopWatchButton
          startStopwatch={startStopwatch}
          pauseStopwatch={pauseStopwatch}
          stopStopwatch={stopStopwatch}
          resetStopwatch={resetStopwatch}
          lapStopwatch={lapStopwatch}
          isRunning={isRunning}
          isPaused={isPaused}
        />
      </View>
      
      <View style={styles.bottomContainer}>
      {isRunning ? (<StopWatchLapTable lapList={lapList} />) : (<></>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  },
  timeText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff'
  }
});