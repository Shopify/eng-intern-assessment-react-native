
import React from 'react';
import { Button, View } from 'react-native';

export default function StopwatchButton({ onResume, onReset, onLap, onPause, isPaused }: { 
  onReset: () => void; 
  onLap: () => void; 
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
}) {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button testID='start-button' title="Start" onPress={onResume} disabled={!isPaused} />
      <Button testID='stop-button' title="Stop" onPress={onPause} disabled={isPaused} />
      <Button testID='reset-button' title="Reset" onPress={onReset} />
      <Button testID='lap-button' title="Lap" onPress={onLap}  />
    </View>
  );
}

