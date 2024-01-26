import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface StopwatchButtonProps {
  isRunning: boolean;  // Prop to determine whether the stopwatch is running
  onStart: () => void;  // Callback function when the start button is pressed
  onStop: () => void;  // Callback function when the stop button is pressed
  onReset: () => void;  // Callback function when the reset button is pressed
  onLap: () => void;  // Callback function when the lap button is pressed

}


// StopwatchButton component to render start, stop, reset, and lap buttons

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onStart, onStop, onReset, onLap }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={isRunning ? 'Stop' : 'Start'} onPress={isRunning ? onStop : onStart} />
      <Button title="Reset" onPress={onReset} />
      <Button title="Lap" onPress={onLap} />
    </View>
  );
};


// Styles for the StopwatchButton component
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default StopwatchButton;
