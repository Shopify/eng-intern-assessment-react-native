import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton'; 

// Utility function to format time
const formatTime = (elapsedTime: number) => {
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return [hours, minutes, seconds].map(val => val < 10 ? `0${val}` : val).join(':');
};

// Stopwatch component
export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, startTime]);

  const handleStart = () => {
    setRunning(true);
    setStartTime(startTime => startTime ?? Date.now());
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setStartTime(null);
  };

  const handleLap = () => {
    setLaps(laps => [...laps, elapsedTime]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.timeDisplay}>{formatTime(elapsedTime)}</Text>
      <StopwatchButton
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
        running={running}
      />
      <ScrollView style={styles.lapScrollView}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lap}>
            Lap {index + 1}: {formatTime(lap)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

// my custom styles, used in the Stopwatch component
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  lapScrollView: {
    maxHeight: 200, 
    width: '100%',
  },
  lapScrollViewContent: {
    alignItems: 'center',
  },
  lap: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  josh: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
});