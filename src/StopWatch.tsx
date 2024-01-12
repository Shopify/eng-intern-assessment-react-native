import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number;
}

// Function to format the elapsed time
export const formatTime = (timeInMillis: number) => {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Ensure two digits for hours, minutes, and seconds
  const formattedHours = hours > 0 ? `${hours}`.padStart(2, '0') + ':' : '00:';
  const formattedMinutes = `${minutes}`.padStart(2, '0') + ':';
  const formattedSeconds = `${seconds}`.padStart(2, '0');

  // Format the time as a string
  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

// Function to display Stopwatch
const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {

  return (
    <View style={styles.stopwatchContainer}>
      {/* Display the formatted time */}
      <Text testID="stopwatch-text" style={styles.timer}>{formatTime(elapsedTime)}</Text>
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