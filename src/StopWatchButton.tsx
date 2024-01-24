import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { StopwatchButtonProps } from './types/types';

export default function StopwatchButton({ isRunning, hasStarted, onStart, onStop, onPause, onReset, onLap }: StopwatchButtonProps) {

  const startPauseButtonTitle = isRunning ? "Pause" : hasStarted ? "Resume" : "Start";

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, isRunning ? styles.stopButton : null]}
        onPress={isRunning ? onPause : onStart}
      >
        <Text style={styles.buttonText}>{startPauseButtonTitle}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.stopButton]} 
        onPress={onStop}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onLap}
      >
        <Text style={styles.buttonText}>Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: 80, // Fixed width for a circular shape
    height: 80, // Fixed height for a circular shape
    borderRadius: 40, // Half of width/height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  stopButton: {
    backgroundColor: '#D00',
  }
});

