import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './src/StopWatchButton';
import { useEffect, useRef, useState } from 'react';
import StopWatch from './src/StopWatch';

export default function App() {

  const [isRunning, setIsRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const timeRef = useRef<number | null>(null);

  const handleRun = () => {
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isRunning) { // start watch
      const prevTime = new Date(Date.now() - timePassed);
      timeRef.current = setInterval(() => {
        setTimePassed(Date.now() - prevTime);
      }, 1000); // updating every second
    } else { // stop watch
      clearInterval(timeRef.current as number);
    }

    return () => {
      clearInterval(timeRef.current as number);
    }
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StopWatch time={timePassed} />
      <StopWatchButton isRunning={isRunning} handleRun={handleRun} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
