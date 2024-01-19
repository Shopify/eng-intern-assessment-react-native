import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native';
import StopWatchButton from "./components/StopWatchButton";
import StopWatchDisplay from "./components/StopWatchTimeDisplay";
import LapsTable from "./components/LapsTable";

/**
 * Stopwatch component with start, stop, reset, and lap functionalities.
 * It displays the current time, lap times, and controls for the stopwatch.
 */
export default function StopWatch() {

  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [lapTimes, setLapTime] = useState<number[]>([])

  useEffect(() => {
    let interval = 0;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds(prevTime => prevTime + 1);
      }, 1000); // Add one second to time every 1000ms (1 second)
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch: () => void = () => {
    setHasStarted(true);
    setTimeInSeconds(0);
    setIsRunning(true);
  };

  // Stop button nullifies the time display as directed in the test cases.
  // This explains the -1 time, signalling for the TimeDisplay to become empty.
  const stopStopwatch: () => void = () => {
    setHasStarted(false);
    setIsRunning(false);
    setTimeInSeconds(-1);
    setLapTime(lapTimes => []);
  };

  const resetStopwatch: () => void = () => {
    setHasStarted(false);
    setIsRunning(false);
    setTimeInSeconds(0);
    setLapTime(lapTimes => []);
  };

  const pauseStopwatch: () => void = () => {
    setIsRunning(false);
  };

  const resumeStopwatch: () => void = () => {
    setIsRunning(true);
  };

  const handleLapPress: () => void = () => {
    setLapTime(lapTimes => [...lapTimes, timeInSeconds]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Shopify_logo.png')}
          style={styles.logo}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.timerDisplay}>
        <StopWatchDisplay timeInSeconds={timeInSeconds}/>
      </View>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title={'Reset'}
          onClick={resetStopwatch}
          color={'#98bb52'}
        />
        <StopWatchButton
          title={isRunning ? 'Stop' : 'Start'}
          onClick={isRunning ? stopStopwatch : startStopwatch}
          color={isRunning ? 'red' : '#98bb52'}
        />
        <StopWatchButton
          title={'Lap'}
          onClick={handleLapPress}
          color={(hasStarted && isRunning) ? '#98bb52' : 'darkgrey'} // color reflective of disabled status
          isDisabled={!(hasStarted && isRunning)}
        />
        <StopWatchButton
          title={isRunning ? 'Pause' : 'Resume'}
          onClick={isRunning ? pauseStopwatch : resumeStopwatch}
          color={hasStarted ? '#98bb52' : 'darkgrey'} // color reflective of disabled status
          isDisabled={!hasStarted}
        />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Lap Number</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>
      <LapsTable lapTimes={lapTimes}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start'
  },
  logoContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%'
  },
  timerDisplay: {
    flex: 0.6,
    margin: 0
  },
  buttonContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 2,
    width: '90%',
    alignSelf: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
