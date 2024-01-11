// Josh Chen
// 2024-Jan-10

import React from 'react';
import { Button, View } from 'react-native';

export default function StopwatchButton({ onStart, onStop, onReset }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="Start" onPress={onStart} />
      <Button title="Stop" onPress={onStop} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
}
