import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './StopWatchButton';
import { useRef, useState } from 'react';
import { formatTime } from './util/formatTime';
import LapTable from './LapTable';

export default function StopWatch() {
  // tracks if timer is running
  const [isRunning, setIsRunning] = useState(false);
  // tracks the time in milliseconds
  const [time, setTime] = useState(0);
  // tracks the lap times in milliseconds
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  // tracks if the lap button should be disabled based on reset clicked
  const [isDisabled, setIsDisabled] = useState(true);
  // tracks the time of the last lap
  const [lastLapTime, setLastLapTime] = useState(0);
  // tracks the interval reference
  const intervalRef = useRef<number | null>(null);

  // start the timer when button is clicked
  const startTimer = () => {
    setIsRunning(true);
    setIsDisabled(false);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);
  };

  // stop the timer when button is clicked
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  // reset the timer to 00:00:00 when button is clicked
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    setLastLapTime(0);
    setIsDisabled(true);
  };

  // add a lap when button is clicked and update the last lap time
  const onLap = () => {
    const currentLapTime = time - lastLapTime;
    setLapTimes([...lapTimes, currentLapTime]);
    setLastLapTime(time);
  }

  return (
    <View style={styles.container}>
      {/* Show the time in HH:MM:SS format */}
      <Text style={styles.timer}>
        {formatTime(time)}
      </Text>
      {/* Show corresponding buttons depending on if timer is running */}
      <View style={styles.buttonsContainer}>
        <StopWatchButton 
          title={isRunning ? 'Stop' : 'Start'} 
          onPress={isRunning ? stopTimer : startTimer} 
          colour={isRunning ? 'red' : 'green'}
        />
        <StopWatchButton 
          title={isRunning ? 'Lap' : 'Reset'} 
          onPress={isRunning ? onLap : reset} 
          colour={isDisabled ? 'lightgrey' : 'grey'} 
          isDisabled={isDisabled}
        />
      </View>
      {/* Show the lap times in a table */}
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
    paddingTop: 80,
  },
  buttonsContainer: {
    flexDirection: 'row',
  }
});
