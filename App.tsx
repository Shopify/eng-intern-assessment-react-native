import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { default as StopWatch } from './src/StopWatch';
import { default as StopWatchButton } from './src/StopWatchButton';
import { default as csToFormattedTime } from './src/format';

export default function App() {
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

  const onStart = () => {
    startTime.current = Date.now();
    // Update time elapsed every 10 milliseconds (every centisecond)
    // Using Date.now() and startTime instead of relying on the milliseconds parameter of setInterval 
    // to track time ensures that lag or the JS event loop do not give inaccurate timing
    intervalRef.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 10);
    setRunning(true);
  };

  const onStop = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setStopDisplayTime(displayTime);
    setRunning(false);
  };

  const onReset = () => {
    setStopDisplayTime(0);
  };

  const onLap = () => {
    console.log('onLap');
  };

  return (
    <View style={styles.container}>
      <StatusBar/>
      <StopWatch 
        formattedTime={formattedTime}
      />
      <View style={styles.grid}>
        <StopWatchButton
          text={running ? 'Lap' : 'Reset'}
          onPress={running ? onLap : onReset}
        />
        <StopWatchButton
          text={running ? 'Stop' : 'Start'}
          onPress={running ? onStop : onStart}
        />
      </View> 
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
});
