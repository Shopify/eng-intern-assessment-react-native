import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StopWatch = forwardRef((props, ref) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Update the elapsed time every 100 milliseconds when the stopwatch is running
  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
      }, 100);
    }

    // Cleanup interval when component unmounts or when the stopwatch is stopped
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Expose functions to parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: function() {setElapsedTime(0)
                      setIsRunning(false)} ,
    getFormattedTime: () => formatTime(elapsedTime),
  }));

  // Helper function to format time in "hh:mm:ss" format
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.stopwatchText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  stopwatchContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stopwatchText: {
    fontSize: 72,
    fontWeight: "300"
  },
});

export default StopWatch;