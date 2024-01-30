import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import StopWatch from './src/StopWatch';
import StopWatchButton from './src/StopWatchButton';

type StopWatchRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getFormattedTime: () => string;
};

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const stopWatchRef = useRef<StopWatchRef | null>(null);

  // Function to start or stop the stopwatch based on its current state
  const startStopWatch = () => {
    if (!isRunning) {
      stopWatchRef.current!.start();
      setIsRunning(true);
    } else {
      stopWatchRef.current!.stop();
      setIsRunning(false);
    }
  };

  // Function to reset the stopwatch and clear recorded laps
  const resetStopWatch = () => {
    stopWatchRef.current!.reset();
    setIsRunning(false);
    setLaps([]);
  };

  // Function to record a lap in the stopwatch
  const recordLap = () => {
    const lapTime = stopWatchRef.current!.getFormattedTime();
    setLaps((previousLaps) => [...previousLaps, lapTime]);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.stopWatch}>
      <StopWatch ref={stopWatchRef} />
      </View>

      
      {/* Display recorded laps */}
      <ScrollView style={styles.lapScrollView}>
      {laps.map((lap, index) => (
        <View key={index} style={styles.lapContainer}>
        <Text style={[styles.lapText, {fontWeight: '500'}]}>{`Lap ${String(index + 1).padStart(2, '0')} : `}</Text>
        <Text style={styles.lapText}>{`${lap}`}</Text>
        </View>
      ))}
      </ScrollView>
      {/* Buttons to control the stopwatch */}
      <View style={styles.buttonsContainer}>
      <StopWatchButton title={isRunning ? 'Stop' : 'Start'} onPress={startStopWatch} />
      <StopWatchButton title="Reset" onPress={resetStopWatch} />
      <StopWatchButton title="Lap" onPress={recordLap} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4bfe85',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    zIndex: 100
  },
  stopWatch: {
    marginTop: 120,
    marginBottom: 0,
  },
  lapContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lapText: {
    fontSize: 18,
  },
  lapScrollView: {
    maxHeight:'50%',
  }

});