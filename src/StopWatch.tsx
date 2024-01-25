import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LapContainer } from './LapContainer';
import StopWatchButton from './StopWatchButton';

type StopWatchStatus = 'COUNTING' | 'NOT_COUNTING' | 'PAUSED' | 'STOPPED'

export default function StopWatch() {

  const stopwatchInterval = useRef<number>(0) // to keep track of the interval
  const startTime = useRef<number>(0); // to keep track of the start time  
  const elapsedPausedTime = useRef<number>(0); // to keep track of the elapsed time while stopped

  const [displayTime, setDisplayTime] = useState("00:00:00") // formatted time displayed on the app
  const [stopWatchStatus, setStopWatchStatus] = useState<StopWatchStatus>('NOT_COUNTING')
  const [laps, setLaps] = useState<Array<string>>([])

  const startInterval = () => {
    startTime.current = new Date().getTime() - elapsedPausedTime.current;

    function updateStopwatch() {
      setDisplayTime(getDisplayTime())
    }
    stopwatchInterval.current = setInterval(updateStopwatch, 1000);
  }

  useEffect(() => {    
    return () => {
      clearInterval(stopwatchInterval.current as number);
    }
  }, [])

  const getDisplayTime = () => {
    const currentTime = new Date().getTime(); // get current time in milliseconds
    const elapsedTime = currentTime - startTime.current; // calculate elapsed time in milliseconds
    const seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    const displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    return displayTime;
  }

  const pad = (num: number) => {
    // add a leading zero if the number is less than 10
    return (num < 10 ? "0" : "") + num
  }

  const start = () => {
    startInterval()
    setStopWatchStatus('COUNTING');
  }
  const stop = () => {
    clearInterval(stopwatchInterval.current)
    elapsedPausedTime.current = 0
    setDisplayTime("00:00:00")
    setStopWatchStatus('STOPPED')
    setLaps([]);
  }
  const pause = () => {
    clearInterval(stopwatchInterval.current)
    elapsedPausedTime.current = new Date().getTime() - startTime.current
    setStopWatchStatus('PAUSED')
  }
  const reset = () => { 
    clearInterval(stopwatchInterval.current)
    elapsedPausedTime.current = 0
    setDisplayTime("00:00:00")
    setStopWatchStatus('NOT_COUNTING')
    setLaps([]);
  }

  const lap = () => {
    setLaps((prevLaps) => [...prevLaps, displayTime])
  }

  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>STOPWATCH</Text>
      </View>
      <View style={styles.timeAndButtonsContainer}>
        {
          stopWatchStatus != 'STOPPED' &&
          <Text style={styles.displayTime}>{displayTime}</Text>
        }
        <View style={styles.buttonGroup}>
          {(stopWatchStatus === 'NOT_COUNTING' || stopWatchStatus === 'STOPPED') && <StopWatchButton onPressHandler={start}>Start</StopWatchButton>}
          {stopWatchStatus === 'COUNTING' && <StopWatchButton onPressHandler={pause}>Pause</StopWatchButton>}
          {stopWatchStatus === 'PAUSED' && <StopWatchButton onPressHandler={start}>Resume</StopWatchButton>}
          <StopWatchButton onPressHandler={stop}>Stop</StopWatchButton>
          <StopWatchButton onPressHandler={reset}>Reset</StopWatchButton>
          <StopWatchButton onPressHandler={lap}>Lap</StopWatchButton>
        </View>
      </View>
      <View style={styles.lapsContainer}>
        <LapContainer laps={laps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stopWatchContainer: {
    backgroundColor: 'black',
    flex: 1,
    width: "100%",
  },
  header: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  timeAndButtonsContainer: {
    paddingTop: 50,
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  displayTime: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff'
  },
  buttonGroup: { 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexDirection: 'row', 
    columnGap: 20, 
    marginTop: 50 
  },
  lapsContainer: {
    flex: 6,
    alignItems: 'center'
  }
})