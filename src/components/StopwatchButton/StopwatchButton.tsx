import React from 'react';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { StopwatchButtonProps, ButtonProps } from '../../types/types';
import styles from './styles';

const RenderButton: React.FC<ButtonProps> = ({ title, onPress, additionalStyle }) => (
  <TouchableOpacity 
    style={[styles.button, additionalStyle as ViewStyle]} 
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function StopWatchButton({ 
  isRunning, 
  hasStarted, 
  onStart, 
  onStop, 
  onPause, 
  onReset, 
  onLap 
}: StopwatchButtonProps) {

  // Determine the title and action for the start/pause button
  const startPauseButton: ButtonProps = {
    title: isRunning ? "Pause" : hasStarted ? "Resume" : "Start",
    onPress: isRunning ? onPause : onStart,
    additionalStyle: isRunning ? styles.stopButton : undefined,
  };

  // Define other buttons with their properties
  const otherButtons: ButtonProps[] = [
    { title: "Stop", onPress: onStop, additionalStyle: styles.stopButton },
    { title: "Reset", onPress: onReset },
    { title: "Lap", onPress: onLap }
  ];

  return (
    <View style={styles.buttonContainer}>
      <RenderButton {...startPauseButton} />
      {otherButtons.map((btn, index) => (
        <RenderButton key={index} {...btn} />
      ))}
    </View>
  );
}