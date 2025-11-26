import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StopWatchButton from './StopWatchButton';
import LapList from './LapList';
import csToFormattedTime from './format';

export default function StopWatch() {
  // Time when we last started the stopwatch
  const startTime = useRef(Date.now());
  // Time elapsed since the last start, as the stopwatch is running
  const [timeElapsed, setTimeElapsed] = useState(0);
  // The time displayed when we last stopped
  const [stopDisplayTime, setStopDisplayTime] = useState(0);
  // Current display time is the time displayed when we last stopped
  // plus the time elapsed since we started
  const displayTime = timeElapsed + stopDisplayTime;
  // Formatting time into 00:00:00 format
  let formattedTime = csToFormattedTime(displayTime);

  // ID for setInterval
  const intervalRef = useRef<number>(0);
  // Whether stopwatch is currently running
  const [running, setRunning] = useState(false);
  // Whether stopwatch is currently reset
  const [reset, setReset] = useState(true);
  // List of lap times
  const [lapList, setLapList] = useState<string[]>([]);

  // Clean up setInterval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [])

  const onStart = () => {
    startTime.current = Date.now();
    // Update time elapsed every 10 milliseconds (every centisecond)
    // Using Date.now() and startTime instead of relying on the milliseconds parameter of setInterval 
    // to track time ensures that lag or the JS event loop do not give inaccurate timing
    intervalRef.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 10);
    setRunning(true);
    setReset(false);
  };

  const onStop = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setStopDisplayTime(displayTime);
    setRunning(false);
  };

  const onReset = () => {
    onStop();
    setStopDisplayTime(0);
    setLapList([]);
    setReset(true);
  };

  const onLap = () => {
    setLapList(lapList => [formattedTime, ...lapList]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.text}> {formattedTime} </Text>
      </View>
      <View style={styles.grid}>
        <StopWatchButton
          text={'Reset'}
          onPress={onReset}
        />
        <StopWatchButton
          text={'Lap'}
          onPress={onLap}
        />
        <StopWatchButton
          text={running ? 'Stop' : (reset ? 'Start' : 'Resume')}
          onPress={running ? onStop : onStart}
        />
      </View>
      <LapList
        lapList={lapList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: "row",
  },
  display: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: "#ADD8E6",
    marginVertical: 20,
  },
  text: {
    fontSize: 30,
    color: "#5A5A5A"
  }
});
