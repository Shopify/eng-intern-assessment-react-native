import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
  const [issRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);


  return (<View style={styles.container}>

    
  </View>);
}

const styles = StyleSheet.create({
  container: {},
});