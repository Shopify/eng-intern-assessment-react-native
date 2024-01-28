import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false)
  const onStartStop = () => (
    setIsRunning(!isRunning)
  )
  
  return (
    <View>
      <Text style={styles.text}>00:00.00</Text>
      <StopWatchButton isRunning={isRunning} onStartStop={onStartStop}/>
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