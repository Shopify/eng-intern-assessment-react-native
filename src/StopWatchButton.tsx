import React from 'react';
import { Button, View } from 'react-native';

export default function StopwatchButton({ onStart, onStop, onReset }) {
  return (
    <View>
      <Button title="Start" onPress={onStart} />
      <Button title="Stop" onPress={onStop} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
}
