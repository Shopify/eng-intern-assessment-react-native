import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

enum StopWatchStates {
  NOT_RUNNING,
  RUNNING,
  PAUSED,
  STOPPED
}

export default function StopWatch() {
  const [stopWatchState, setStopWatchState] = useState(StopWatchStates.NOT_RUNNING)
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);
  const [laps, setLaps] = useState<number[]>([])

  useEffect(() => {
    let timer: number = 0;
    if (stopWatchState == StopWatchStates.RUNNING) {
      timer = setInterval(() => {
        setTimeInCentiseconds((prevTime) => prevTime + 1)
      }, 10)
    }
    return () => {
      clearInterval(timer);
    };
  }, [stopWatchState])

  function handleStart() {
    setStopWatchState(StopWatchStates.RUNNING)
  }

  function handleStop() {
    setTimeInCentiseconds(0)
    setLaps([])
    setStopWatchState(StopWatchStates.STOPPED)
  }

  return (
    <View >
      <View>
      <View style={styles.container}>
      { stopWatchState == StopWatchStates.STOPPED ? null : <Text>{formattedTime(timeInCentiseconds)}</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <StopWatchButton buttonTappedHandler={handleStart} label={'Start'} />
        <StopWatchButton buttonTappedHandler={handleStop} label={'Stop'} />
      </View>
    </View>
    </View>
    </View>
  );
}

function formattedTime(timeInCentiseconds: number): string {
  const totalSeconds = Math.floor(timeInCentiseconds / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = timeInCentiseconds % 100;

  const formattedTime = `${padWithZero(minutes)}:${padWithZero(seconds)}:${padWithZero(centiseconds)}`;
  return formattedTime;
}

function padWithZero(num: number): string {
  return num.toString().padStart(2, '0');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
