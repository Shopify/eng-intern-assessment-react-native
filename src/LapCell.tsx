import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDisplayTimeFromSeconds } from '../utils/timeDisplayUtils';

interface LapCellProps {
    lapTimeInSeconds: number;
    index: number;
  }

// this component is an individual cell in a table of laps (i.e. a record of a single lap)
const LapCell = ({ lapTimeInSeconds, index }: LapCellProps) => {
  return (
    <Text style={styles.lapCell} key={index}>{`Lap ${index + 1}: ${formatDisplayTimeFromSeconds(lapTimeInSeconds)}`}</Text>
  );
};

const styles = StyleSheet.create({
  lapCell: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default LapCell;
