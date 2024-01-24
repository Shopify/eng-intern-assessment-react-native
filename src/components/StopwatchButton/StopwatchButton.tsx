import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StopwatchButtonProps } from '../../types/types';
import styles from './styles';

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
