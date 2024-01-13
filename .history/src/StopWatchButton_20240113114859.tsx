// Josh Chen
// 2024-Jan-10

import React from 'react';
import { Button, View } from 'react-native';

export default function StopwatchButton({ onStartStopResume, onReset, onLap, onStop, running, hasStarted }: { 
  onStartStopResume: () => void; 
  onReset: () => void; 
  onLap: () => void; 
  onStop: () => void;
  running: boolean; 
  hasStarted: boolean; 
}) {
  let buttonLabel = running ? "Pause" : hasStarted ? "Resume" : "Start";

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title={buttonLabel} onPress={onStartStopResume} />
      <Button title="Lap" onPress={onLap} disabled={!running} />
      <Button title="Reset" onPress={onReset} disabled={!hasStarted} />
      <Button title="Stop" onPress={onStop} disabled={!hasStarted} />
    </View>
  );
}