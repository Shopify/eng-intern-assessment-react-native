
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
      <Button title="Start" onPress={onResume} disabled={!isPaused} />
      <Button title="Stop" onPress={onPause} disabled={isPaused} />
      <Button title="Reset" onPress={onReset} />
      <Button title="Lap" onPress={onLap}  />
    </View>
  );
}

