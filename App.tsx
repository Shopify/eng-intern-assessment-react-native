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
      <View style={styles.lapListContainer}>
        <FlatList 
          data={laps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item, index}) => (
              <View style={styles.lapContainer}>
                <Text style={styles.lapText}>{
                  `Lap ${index + 1}: ${item}`
                }</Text>
              </View>
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
  lapListContainer: {
    flex: 0.5,
    width: '100%',
  },
  lapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#696969',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  lapText: {
    color: "#fff",
    fontSize: 24,
  }
});
