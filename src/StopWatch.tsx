import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  const startStopwatch = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (startTime !== null) {
      setLaps([...laps, elapsedTime]);
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - (startTime || 0));
      }, 100);
    } else if (interval !== undefined) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  return (<View style={styles.container}>
    <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
    <View style={styles.buttonsContainer}>
      <StopWatchButton label={isRunning ? 'Stop' : 'Start'} onPress={isRunning ? stopStopwatch : startStopwatch} />
      <StopWatchButton label='Reset' onPress={resetStopwatch} />
      <StopWatchButton label='Lap' onPress={recordLap} />
    </View>
    <View style={styles.lapsContainer}>
      {laps.map((lapTime, index) => (
        <Text style={styles.lapText} key={index} >
          Lap {index + 1}: {formatTime(lapTime)}
        </Text>
      ))}
    </View>
  </View>);
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer:{
    fontSize: 32,
    fontWeight:'bold',
    marginVertical: 20,
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 20,
  },
  lapsContainer:{
    alignItems: 'center',
  },
  lapText:{
    fontSize: 16,
    marginBottom: 5,
  }
});

export default StopWatch;