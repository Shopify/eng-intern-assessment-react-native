// Josh Chen
// 2024-Jan-10

import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton'; 

// Stopwatch component
export default function Stopwatch() {
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); 
  const [laps, setLaps] = useState<number[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTime, setShowTime] = useState(true);
  
  useEffect(() => { 
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Format time to HH:MM:SS
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map(val => val < 10 ? `0${val}` : val)
      .join(':');
  };


  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]); 
    setHasStarted(false);
  };
  const handleStop = () => {
    setRunning(false);
    setTime(0);
    setShowTime(false);
    setLaps([]); 
    setHasStarted(false);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleStartStopResume = () => {
    if (!running) {
      if (!hasStarted) {
        setHasStarted(true);
      }
      setRunning(true);
      setShowTime(true);
    } else {
      setRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Stopwatch</Text>
        {showTime && <Text style={styles.timeDisplay}>{formatTime(time)}</Text>}
        <StopwatchButton
          onStartStopResume={handleStartStopResume}
          onReset={handleReset}
          onLap={handleLap}
          onStop={handleStop}
          running={running}
          hasStarted={hasStarted}
        />
        <Text style={styles.instructions}>
          Press 'Start' to begin, 'Pause' to pause, 'Lap' to record laps, 'Reset' to clear, and 'Stop' to stop!
        </Text>
        <Text style={styles.josh}>
          Thanks for using my app.
        </Text>
      </View>
      <Text style={styles.instructions}>
      {laps.length > 5 && "If the lap list gets too long, please scroll down."}
        </Text>
      <ScrollView
        testID="lap-list"
        style={styles.lapScrollView}
        contentContainerStyle={styles.lapScrollViewContent}
      >
        
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