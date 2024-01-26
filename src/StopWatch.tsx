import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StopwatchProps {
  elapsedTime: number; // Props to receive the elapsed time from the parent component
}

// Stopwatch component to display the elapsed time
const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime }) => {
  return (
    <View style={styles.stopwatchContainer}>
      <Text style={styles.stopwatchText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

// Function to format the time as MM:SS
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


// Styles for the Stopwatch component
const styles = StyleSheet.create({
  stopwatchContainer: {
    marginBottom: 20,
  },    // Styles for the Stopwatch container

  
  stopwatchText: {
    fontSize: 36,
  },    // Styles for the Stopwatch Text 
});

export default Stopwatch;
