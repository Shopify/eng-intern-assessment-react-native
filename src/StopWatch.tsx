import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const intervalRef = useRef()

  const onStart = () => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      // increase time by 10 milliseconds per 10 milliseconds, better performance than per millisecond
      setTime(time => time + 10)
    }, 10)
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
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0')
    const milliseconds = Math.floor(time % 1000 / 10).toString().padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }

  return (
    <View>
      <Text style={styles.text}>{formatTime(time)}</Text>
      <StopWatchButton 
        isRunning={isRunning} 
        onStartPress={onStart} 
        onStopPress={onStop} 
        onResetPress={resetTimer}
      />
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

export default StopWatch