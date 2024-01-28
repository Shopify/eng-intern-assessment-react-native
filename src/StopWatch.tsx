import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const intervalRef = useRef()

  const onStart = () => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTime(time => time + 1)
    }, 1000)
  }
  const onStop = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }
  const resetTimer = () => {
    setTime(0)
    onStop()
  }
  
  return (
    <View>
      <Text style={styles.text}>{time}</Text>
      <StopWatchButton isRunning={isRunning} onStartPress={onStart} onStopPress={onStop} onResetPress={resetTimer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})