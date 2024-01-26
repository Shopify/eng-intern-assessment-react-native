import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {
  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.stopwatchText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  stopwatchContainer: {
    marginBottom: 20,
  },
  stopwatchText: {
    fontSize: 36,
  },
});

export default Stopwatch;
