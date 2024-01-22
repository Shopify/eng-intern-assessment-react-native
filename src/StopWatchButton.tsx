import React from 'react';
import { View, Button } from 'react-native';

interface StopwatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

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