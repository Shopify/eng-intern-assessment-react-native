import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Defining the types for the component props
type StopwatchProps = {
  time: number; // Current time of the stopwatch
  laps: number[]; // Array to store lap times
};

const Stopwatch: React.FC<StopwatchProps> = ({ time, laps }) => {
  // Function to format time into a readable format (MM:SS.ms)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Displaying the formatted time */}
      <Text style={styles.timerDisplay}>{formatTime(time)}</Text>
      
      {/* ScrollView to list lap times */}
      <ScrollView style={styles.lapList}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lapTime}>
            Lap {index + 1}: {formatTime(lap)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  lapList: {
    flex: 1,
    width: '100%',
    padding: 5,
  },
  lapTime: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default Stopwatch;

