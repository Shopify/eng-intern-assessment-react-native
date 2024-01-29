import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.stopwatch}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stopwatch: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 40,
  },
});

export default Stopwatch;
