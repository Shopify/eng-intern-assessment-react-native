import { View, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';
import LapsList from './LapsList';
import { formatDisplayTimeFromSeconds } from '../utils/timeDisplayUtils';

enum StopWatchStates {
  NOT_RUNNING,
  RUNNING,
  PAUSED,
  STOPPED
}

const screenWidth = Dimensions.get('window').width

export default function StopWatch() {
  const [stopWatchState, setStopWatchState] = useState(StopWatchStates.NOT_RUNNING);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  // when the watch is running, the timer is incremented every 1000 milliseconds (1 second)
  useEffect(() => {
    let timer: number = 0;
    if (stopWatchState == StopWatchStates.RUNNING) {
      timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [stopWatchState]);

  // starts running the timer
  function handleStart() {
    setStopWatchState(StopWatchStates.RUNNING);
  }

  // stops the timer and resets laps
  function handleStop() {
    setTimeInSeconds(0);
    setLaps([]);
    setStopWatchState(StopWatchStates.STOPPED);
  }

  // stops the timer and resets laps
  function handleReset() {
    setStopWatchState(StopWatchStates.NOT_RUNNING);
    setLaps([]);
    setTimeInSeconds(0);
  }

  // pauses the timer
  function handlePause() {
    setStopWatchState(StopWatchStates.PAUSED);
  }

  // adds a lap
  function handleLap() {
    setLaps((prevLaps) => [...prevLaps, timeInSeconds]);
  }

  // certain buttons are dynamically rendered. e.g. the rendering of Start, Pause, and Resume are mutually exclusive
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        {stopWatchState !== StopWatchStates.STOPPED && 
          <Text style={styles.timeText}>{formatDisplayTimeFromSeconds(timeInSeconds)}</Text>
        }
      </View>
      <View style={styles.buttonContainer}>
        {stopWatchState === StopWatchStates.NOT_RUNNING && <StopWatchButton buttonTappedHandler={handleStart} label={'Start'} />}
        {stopWatchState === StopWatchStates.RUNNING && <StopWatchButton buttonTappedHandler={handlePause} label={'Pause'}  />}
        {stopWatchState === StopWatchStates.PAUSED && <StopWatchButton buttonTappedHandler={handleStart} label={'Resume'} />}
        {stopWatchState === StopWatchStates.STOPPED && <StopWatchButton buttonTappedHandler={handleStart} label={'Start'} />}
        <StopWatchButton buttonTappedHandler={handleStop} label={'Stop'} />
        <StopWatchButton buttonTappedHandler={handleReset} label={'Reset'} />
        <StopWatchButton buttonTappedHandler={handleLap} label={'Lap'} />
      </View>
      <LapsList laps={laps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: screenWidth * 0.5
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

