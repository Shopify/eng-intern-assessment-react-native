import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

/**
 * @interface StopwatchProps
 * @property {number} elapsedTime - Elapsed time in milliseconds
 * @property {number[]} laps - Array of lap times in milliseconds
 */
interface StopwatchProps {
  elapsedTime: number;
  laps: number[];
}

/**
 * Stopwatch Component
 * Displays the elapsed time and a list of lap times.
 * @component
 *
 * @param {StopwatchProps} props - Component props
 */
const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime, laps }) => {
  /**
   * Format Time
   * Converts time in milliseconds to a formatted string (MM:SS.SS).
   * @param {number} time - Time in milliseconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  /**
   * Render Lap Item
   * Renders an individual lap item within the FlatList.
   * @param {object} param0 - FlatList item and index
   * @param {number} param0.item - Lap time in milliseconds
   * @param {number} param0.index - Index of the lap item
   * @returns {JSX.Element} Lap item component
   */
  const renderLapItem = ({ item, index }: { item: number; index: number }) => (
    <Text key={index} style={styles.lapItem}>
      Lap {index + 1}: {formatTime(item)}
    </Text>
  );

  //Render the Stopwatch component
  return (
    <View style={styles.stopwatch}>
      {/* Display elapsed time */}
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>

      {/* Display list of lap times using FlatList */}
      <FlatList
        data={laps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLapItem}
      />
    </View>
  );
};

//Styles for the Stopwatch component
const styles = StyleSheet.create({
  stopwatch: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 40,
  },
  lapItem: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Stopwatch;
