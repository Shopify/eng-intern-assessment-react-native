import React from 'react';
import { Text, View } from 'react-native';
import { formatTime } from './utils/formatTime'

interface StopwatchProps {
  time: number;
  laps: string[];
}

export default function Stopwatch({ time = 0, laps = [] }: StopwatchProps) {
  return (
    <View>
      <Text>{formatTime(time)}</Text>
      {laps.map((lap, index) => (
        <Text key={index}>{lap}</Text>
      ))}
    </View>
  );
}