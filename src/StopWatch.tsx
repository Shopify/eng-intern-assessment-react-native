import React from 'react';
import { View, Text } from 'react-native';

interface StopWatchProps {
  time: number;
  laps: number[]; 
}

export default function StopWatch({ time, laps }: StopWatchProps) {
  return (
    <View>
      {/* Display the current time in seconds */}
      <Text>{time}s</Text>
      {laps.map((lap, index) => (
        <Text key={index}>Lap {index + 1}: {lap}s</Text> // Display each lap
      ))}
    </View>
  );
}
