import React from 'react';
import { View, Text } from 'react-native';

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  return (
    <View>
      {/* Display the current time in seconds */}
      <Text>{time}s</Text>
    </View>
  );
}
