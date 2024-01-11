import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {
  // Function to format the elapsed time
  const formatTime = (timeInMillis: number) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInMillis % 1000) / 10); // Two digits after the seconds

    // Format the time as a string
    return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  return (
    <View style={styles.stopwatchContainer}>
      {/* Display the formatted time */}
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stopwatchContainer: {
    alignItems: 'center',
    backgroundColor: '#8CC152',
    padding: 20,
    borderRadius: 10,
  },
  timer: {
    fontSize: 60,
    color: '#fff',
  },
});

export default Stopwatch;
