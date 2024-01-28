import React, {useState, useRef} from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [laps, setLaps] = useState([])
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
    setLaps([])
  }
  const onLap = () => {
    setLaps([...laps, time])
    setTime(0)
  }
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0')
    const milliseconds = Math.floor(time % 1000 / 10).toString().padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }
  const renderLapItem = ({ item, index }) => (
    <Text style={styles.lapText}>
      Lap {index + 1}: {formatTime(item)}
    </Text>
  )
  const lineSeparator = () => (
    <View style={styles.lineSeparator} />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(time)}</Text>

      <StopWatchButton 
        isRunning={isRunning} 
        onStartPress={onStart} 
        onStopPress={onStop} 
        onResetPress={resetTimer}
        onLapPress={onLap}
      />

      <FlatList
        data={laps}
        renderItem={renderLapItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={lineSeparator}
        ListHeaderComponent={lineSeparator}
        ListFooterComponent={lineSeparator}
        style={styles.lapsContainer}
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
  },
  lapsContainer: {
    margin: 10,
  },
  lapText: {
    fontSize: 15,
    color: 'white',
    marginVertical: 5,
  },
  lineSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
  },
})

export default StopWatch