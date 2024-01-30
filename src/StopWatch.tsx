import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Declares props that will be used by the StopWatch
type Props = {
  // Variable that keeps track of the current stopwatch count
  stopWatchCount: number;
};

export const StopWatch: React.FC<Props> = ({ stopWatchCount }) => {
  // Hours Count
  const hours = Math.floor(stopWatchCount / (60 * 60 * 1000)).toString().padStart(2, '0');

  // Minutes Count
  const minutes = Math.floor((stopWatchCount % (60 * 60 * 1000)) / (60 * 1000)).toString().padStart(2, '0');

  // Seconds Count
  const seconds = Math.floor((stopWatchCount % (60 * 1000)) / 1000).toString().padStart(2, '0');

  // Milliseconds Count
  const milliseconds = (stopWatchCount % 1000).toString().padStart(3, '0').slice(0, 2);

  return (
    // Display the current stopwatch time in HH:MM:SS format
    <View style={styles.stopWatchCountContainer}>
      <Text style={styles.timeText}>{hours}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.timeText}>{minutes}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.timeText}>{seconds}</Text>
      <Text style={styles.separator}>.</Text>
      <Text style={styles.timeTextMS}>{milliseconds}</Text>
    </View>
  );
};

// StopWatch Styles
const styles = StyleSheet.create({
  // StopWatch Container
  stopWatchCountContainer: {
    paddingTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Time Text (Hours, Mins, Secs)
  timeText: {
    fontSize: 50,
    fontWeight: '700',
    width: 70, // Adjusted width for better spacing
    textAlign: 'center',
    color: '#383838',
  },

  // Separator
  separator: {
    fontSize: 50,
    fontWeight: '700',
    color: '#383838',
  },

  // Miliseconds Text
  timeTextMS: {
    fontSize: 20,
    fontWeight: '700',
    width: 30, // Adjusted width for better spacing
    textAlign: 'center',
    color: '#383838',
    marginTop: 10
  },
  
});