import React from 'react';
import { Text, View } from 'react-native';
import { formatTime } from './utils/formatTime'
import { StopwatchProps } from './types/types'

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