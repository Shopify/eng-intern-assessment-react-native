import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default function StopwatchButton({ onStart, onStop, onPause, onReset, onLap, running, hasStarted }: { 
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onReset: () => void; 
  onLap: () => void; 
  running: boolean; 
  hasStarted: boolean; 
}) {
  return (
    <View style={styles.buttonContainer}>
      {!running && !hasStarted && <Button title="Start" onPress={onStart} />}
      {running && <Button title="Pause" onPress={onPause} />}
      {!running && hasStarted && <Button title="Resume" onPress={onStart} />}
      <Button title="Lap" onPress={onLap} disabled={!running} />
      <Button title="Reset" onPress={onReset} disabled={!hasStarted} />
      <Button title="Stop" onPress={onStop} disabled={!hasStarted || running} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },
});
