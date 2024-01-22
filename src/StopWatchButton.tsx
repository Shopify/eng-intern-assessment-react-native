import React from 'react';
import { View, Button } from 'react-native';
import { StopwatchButtonProps } from './types/types';

export default function StopwatchButton({ onStart, onStop, onReset, onLap }: StopwatchButtonProps) {
  return (
    <View>
      <Button onPress={onStart} title="Start" />
      <Button onPress={onStop} title="Stop" />
      <Button onPress={onReset} title="Reset" />
      <Button onPress={onLap} title="Lap" />
    </View>
  );
}