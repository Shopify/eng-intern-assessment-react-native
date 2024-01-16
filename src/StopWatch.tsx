// TODO: add comments and add nicer UI

import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useEffect, useState } from 'react';
import { formatTime } from './util/formatTime';
import LapTable from './LapTable';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      setIsDisabled(false);
      timer = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    setIsDisabled(true);
  };

  const onLap = () => {
    console.log(`${formatTime(time)}`)
    setLapTimes([...lapTimes, time]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {formatTime(time)}
      </Text>
      <View style={styles.buttonsContainer}>
        <StopWatchButton 
          title={isRunning ? 'Stop' : 'Start'} 
          onPress={startStop} 
          colour={isRunning ? 'red' : 'green'}
        />
        <StopWatchButton 
          title={isRunning ? 'Lap' : 'Reset'} 
          onPress={isRunning ? onLap : reset} 
          colour={isDisabled ? 'lightgrey' : 'grey'} 
          isDisabled={isDisabled}
        />
      </View>
      <LapTable lapTimes={lapTimes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 50,
    paddingTop: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
  }
});
