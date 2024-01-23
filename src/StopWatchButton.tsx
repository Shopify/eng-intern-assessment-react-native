import React from 'react';
import { View, Button } from 'react-native';
import { StopwatchButtonProps } from './types/types';

export default function StopwatchButton({ isRunning, hasStarted, onStart, onStop, onPause, onReset, onLap }: StopwatchButtonProps) {

  const startPauseButtonTitle = isRunning ? "Pause" : hasStarted ? "Resume" : "Start";

  return (
    <View>
      <Button onPress={isRunning ? onPause : onStart} title={startPauseButtonTitle} />
      <Button onPress={onStop} title="Stop" />
      <Button onPress={onReset} title="Reset" />
      <Button onPress={onLap} title="Lap" />
    </View>
  );
}
