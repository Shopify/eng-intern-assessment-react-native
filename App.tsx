import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import StopWatchButton from './src/StopWatchButton';
import { useEffect, useRef, useState } from 'react';
import StopWatch from './src/StopWatch';
import { formatTime } from './util/format';

export default function App() {

  const [isRunning, setIsRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [laps, setLaps] = useState([]);
  const timeRef = useRef<number | null>(null);

  const handleRun = () => {
    setIsRunning(!isRunning);
  }

  const handleReset = () => {
    clearInterval(timeRef.current as number);
    setTimePassed(0);
    setIsRunning(false);
    setLaps([]);
  }

  const handleLap = () => {
    const prevTime = new Date(Date.now() - timePassed);
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, formatTime(Date.now() - prevTime.getTime())]);
    }
  };

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
      <StopWatchButton isRunning={isRunning} handleRun={handleRun} handleReset={handleReset} handleLap={handleLap}/>
      <View style={styles.lapsContainer}>
        <FlatList 
          data={laps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item, index}) => (
              <Text style={styles.lapText}>{
                `Lap ${index + 1}: ${item}`
              }</Text>
            )
          }
        />
      </View>
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
  lapsContainer: {
    flex: 0.5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff'
  },
  lapText: {
    color: '#fff',
    margin: 5
  }
});
